import { Injectable } from '@nestjs/common';
import {
  BugtrackerUserEntity,
  BugtrackerUserRelationEnum,
} from '../../bugtracker/users/entity/bugtracker-user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../../bugtracker/users/dto/create-user.dto';
import { MantisbtUser } from '../../mantisbt-api/users/mantisbt-api-users.repository';
import { instanceToPlain, plainToClass } from 'class-transformer';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminMantisbtApiUsersRepository } from './admin-mantisbt-api-users.repository';
import { MantisbtUserEntity } from '../../mantisbt/users/entity/mantisbt-user.entity';
import { MantisbtDatabaseConnection } from '../../../types/mantisbt.database.constants';
import { AdminMantisbtApiTokensService } from './admin-mantisbt-api-tokens.service';
import { MantisbtProjectUserListEntity } from '../../mantisbt/projects/entity/mantisbt-project-user-list.entity';
import { MantisbtProjectEntity } from '../../mantisbt/projects/entity/mantisbt-project.entity';
import { ProjectViewStatueKeys } from '../../mantisbt/projects/interfaces/project-view-statue.interface';
import { ProjectObject } from '../../bugtracker/projects/interfaces/bugtracker-projects.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly adminMantisbtApiTokensService: AdminMantisbtApiTokensService,
    @InjectRepository(BugtrackerUserEntity)
    private readonly bugtrackerUserRepository: Repository<BugtrackerUserEntity>,
    @InjectRepository(MantisbtUserEntity, MantisbtDatabaseConnection)
    private readonly mantisbtUsersRepository: Repository<MantisbtUserEntity>,
    @InjectRepository(MantisbtProjectUserListEntity, MantisbtDatabaseConnection)
    private readonly mantisbtProjectUserListRepository: Repository<MantisbtProjectUserListEntity>,
    @InjectRepository(MantisbtProjectEntity, MantisbtDatabaseConnection)
    private readonly mantisbtProjectRepository: Repository<MantisbtProjectEntity>,
    private readonly adminMantisbtApiUsersRepository: AdminMantisbtApiUsersRepository,
  ) {}

  async findOneUserBy({
    thirdPartyUserId,
    id,
  }: {
    thirdPartyUserId?: string;
    id?: number;
  }): Promise<BugtrackerUserEntity> {
    let user = new BugtrackerUserEntity();
    const relations = [
      BugtrackerUserRelationEnum.ROLES,
      BugtrackerUserRelationEnum.EMPLPOYEE,
    ];
    if (thirdPartyUserId) {
      user = await this.bugtrackerUserRepository.findOne({
        where: {
          supertokensThirdPartyUserId: thirdPartyUserId,
        },
        relations,
      });
    }
    if (id) {
      user = await this.bugtrackerUserRepository.findOne({
        where: {
          id,
        },
        relations,
      });
    }
    return instanceToPlain(user) as BugtrackerUserEntity;
  }

  async findProjectsByUserId(userId: number): Promise<ProjectObject> {
    let result: ProjectObject = {
      list: [],
      projects: [],
    };
    const projectsOfUser = await this.mantisbtProjectRepository.find({
      relations: {
        projectUser: true,
      },
      where: [
        {
          viewState: ProjectViewStatueKeys.public_10,
        },
        {
          viewState: ProjectViewStatueKeys.private_50,
          projectUser: {
            userId: userId,
          },
        },
      ],
      order: {
        id: 'ASC',
      },
    });
    if (projectsOfUser.length > 0) {
      result = instanceToPlain(projectsOfUser).reduce(
        (acc: ProjectObject, current: MantisbtProjectEntity) => {
          acc.list.push(+current.id);
          acc.projects.push({
            id: +current.id,
            name: current.name,
            viewState: current?.viewState,
            accessLevel: current?.projectUser?.accessLevel,
          });
          return acc;
        },
        result,
      );
    }
    return result;
  }

  async createUserAndApiToken(createUserDto: CreateUserDto) {
    const userName = createUserDto.account.split('@')[0];
    const realName = userName.charAt(0).toUpperCase() + userName.slice(1);
    const accountAnd5364Password = `${userName
      .replace(/[^a-zA-Z0-9]/g, '')
      .slice(0, 20)}5364`; // account + 5364 = account5364

    const { account, supertokensThirdPartyId, supertokensThirdPartyUserId } =
      createUserDto;

    const mantisbtExistUser = await this.mantisbtUsersRepository.findOne({
      where: {
        email: account,
      },
    });

    console.log('mantisbtExistUser:', mantisbtExistUser);

    let mantisbtUser: MantisbtUser;
    // Create Mantis User
    if (mantisbtExistUser) {
      mantisbtUser = await this.adminMantisbtApiUsersRepository.getUserById(
        mantisbtExistUser.id,
      );
    } else {
      mantisbtUser = await this.adminMantisbtApiUsersRepository.createUser({
        username: userName,
        password: accountAnd5364Password,
        realName: realName,
        email: account,
      });
    }

    // Create API Token
    const mantisAPIToken =
      await this.adminMantisbtApiUsersRepository.createTokenByUserId(
        mantisbtUser.id,
      );
    await this.adminMantisbtApiTokensService.updateTokenById(
      +mantisAPIToken.id,
    );
    // Create Bug Tracker User
    const newUser = this.bugtrackerUserRepository.create(
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
    await this.bugtrackerUserRepository.save(newUser);
    return newUser;
  }
}
