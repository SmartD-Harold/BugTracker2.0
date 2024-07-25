import { Injectable, NotFoundException } from '@nestjs/common';
import { BugtrackerUserRepository } from './bugtracker-user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { MantisbtApiUsersService } from '../../mantisbt-api/users/mantisbt-api-users.service';
import { FindUserDto } from './dto/find-user.dto';
import { plainToClass } from 'class-transformer';
import { deleteUser } from 'supertokens-node';
import { MantisbtUsersService } from '../../mantisbt/users/mantisbt-users.service';
import { MantisbtRestApiTokensService } from '../../mantisbt/tokens/mantisbt-rest-api-tokens.service';
import { MantisbtUser } from '../../mantisbt-api/users/mantisbt-api-users.repository';
import { BugtrackerRolesRepository } from './bugtracker-roles.repository';
import { BugtrackerUserRelationEnum } from './entity/bugtracker-user.entity';
import { In } from 'typeorm';

@Injectable()
export class BugtrackerUserService {
  constructor(
    private readonly bugtrackerUserRepository: BugtrackerUserRepository,
    private readonly mantisbtApiUsersService: MantisbtApiUsersService,
    private readonly mantisbtRestApiTokensService: MantisbtRestApiTokensService,
    private readonly mantisbtUsersService: MantisbtUsersService,
    private readonly bugtrackerRolesRepository: BugtrackerRolesRepository,
  ) {}

  async deleteSupertokensUserForId(thirdPartyUserId: string) {
    return await deleteUser(thirdPartyUserId); // this will succeed even if the userId didn't exist.
  }

  async deleteUserByEmail(findUserDto: FindUserDto) {
    const { thirdPartyId, email } = findUserDto;
    //　用Email找出使用者
    const user = await this.bugtrackerUserRepository.findOneUserBy({
      thirdPartyId,
      email,
    });

    if (!user) {
      throw new NotFoundException(
        `User:${email}, thirdPartyId:${thirdPartyId} not found`,
      );
    }
    // 刪除User
    await this.bugtrackerUserRepository.deleteUserById(user.id);
    // 刪除Mantis API Token
    await this.mantisbtApiUsersService.deleteAPITokenByUser({
      id: user.mantisbtApiTokenId,
      userId: user.mantisbtUserId,
    });
    // 刪除Mantis User
    await this.mantisbtApiUsersService.deleteUser(user.mantisbtUserId);
    // 刪除Supertokens User
    await this.deleteSupertokensUserForId(user.supertokensThirdPartyUserId);

    return {
      message: `delete user:${user.account} successfully`,
    };
  }

  async findUsers() {
    return this.bugtrackerUserRepository.findUsers();
  }

  async findOneUser(thirdPartyUserId: string) {
    return this.bugtrackerUserRepository.findOneUserBy({
      thirdPartyUserId: thirdPartyUserId,
    });
  }

  async findOneUserBy(findUserDto: FindUserDto) {
    return this.bugtrackerUserRepository.findOneUserBy(findUserDto);
  }

  async createUserAndApiToken(createUserDto: CreateUserDto) {
    const userName = createUserDto.account.split('@')[0];
    const realName = userName.charAt(0).toUpperCase() + userName.slice(1);
    const accountAnd5364Password = `${userName
      .replace(/[^a-zA-Z0-9]/g, '')
      .slice(0, 20)}5364`; // account + 5364 = account5364

    const { account, supertokensThirdPartyId, supertokensThirdPartyUserId } =
      createUserDto;

    const mantisbtExistUser =
      await this.mantisbtUsersService.findUserByEmail(account);

    console.log('mantisbtExistUser:', mantisbtExistUser);

    let mantisbtUser: MantisbtUser;
    // Create Mantis User
    if (mantisbtExistUser) {
      mantisbtUser = await this.mantisbtApiUsersService.getUser(
        mantisbtExistUser.id,
      );
    } else {
      mantisbtUser = await this.mantisbtApiUsersService.createUser({
        username: userName,
        password: accountAnd5364Password,
        realName: realName,
        email: account,
      });
    }

    // Create API Token
    const mantisAPIToken = await this.mantisbtApiUsersService.createTokenByUser(
      mantisbtUser.id,
    );
    await this.mantisbtRestApiTokensService.updateTokenById(mantisAPIToken.id);

    // Create Bug Tracker User
    return this.bugtrackerUserRepository.createUser(
      plainToClass(CreateUserDto, {
        account, // email
        supertokensThirdPartyId,
        supertokensThirdPartyUserId,
        userName: realName,
        mantisbtUserId: mantisbtUser.id,
        mantisbtUserPassword: accountAnd5364Password,
        mantisbtApiTokenId: mantisAPIToken.id,
        mantisbtApiTokenCode: mantisAPIToken.token,
      } as CreateUserDto),
    );
  }

  async findLastedRoles({ size = 100 } = {}) {
    const _roles = await this.bugtrackerRolesRepository.find({
      select: {
        id: true,
        code: true,
        name: true,
      },
      take: size,
    });
    return _roles.map((role) => {
      return {
        id: role.id,
        code: role.code,
        name: role.name,
      };
    });
  }

  async findLastedUsers({ size = 100 } = {}) {
    const _user = await this.bugtrackerUserRepository.find({
      take: size,
      select: {
        id: true,
        account: true,
        userName: true,
        employee: {
          employeeId: true,
          name: true,
          department: true,
        },
      },
      relations: [BugtrackerUserRelationEnum.EMPLPOYEE],
    });
    return _user.map((user) => {
      return {
        id: user.id,
        account: user.account,
        userName: user.userName,
        employeeId: user?.employee?.employeeId || null,
        employeeName: user?.employee?.name || null,
        department: user?.employee?.department || null,
      };
    });
  }

  async findUsersByEmail(emails: string[]) {
    return await this.bugtrackerUserRepository.find({
      select: {
        id: true,
        account: true,
        userName: true,
        mantisbtUserId: true,
        enabled: true,
        employee: {
          employeeId: true,
          name: true,
          department: true,
          isCompanyEmail: true,
        },
      },
      where: {
        account: In(emails),
      },
      relations: [BugtrackerUserRelationEnum.EMPLPOYEE],
    });
  }
}
