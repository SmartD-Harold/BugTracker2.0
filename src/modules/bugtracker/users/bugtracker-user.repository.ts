import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import {
  BugtrackerUserEntity,
  BugtrackerUserRelationEnum,
} from './entity/bugtracker-user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { FindUserDto } from './dto/find-user.dto';
import { ThirdParty } from '../../main/auth/types/supertokens.constants';

@Injectable()
export class BugtrackerUserRepository extends Repository<BugtrackerUserEntity> {
  constructor(protected dataSource: DataSource) {
    super(BugtrackerUserEntity, dataSource.createEntityManager());
  }

  async deleteUserById(id: number): Promise<void> {
    await this.delete(id);
  }

  async findUsers(): Promise<BugtrackerUserEntity[]> {
    return this.find({
      relations: [BugtrackerUserRelationEnum.ROLES],
    });
  }

  async findOneUserBy(
    findUserByDto: FindUserDto,
  ): Promise<BugtrackerUserEntity> {
    const { thirdPartyUserId } = findUserByDto;

    if (thirdPartyUserId) {
      return this.findOneBy({
        supertokensThirdPartyId: thirdPartyUserId,
      });
    }

    const { email, thirdPartyId = ThirdParty.SmartDaily } = findUserByDto;
    return this.findOneBy({
      account: email,
      supertokensThirdPartyId: thirdPartyId,
    });
  }

  async createUser(
    createUserDto: CreateUserDto,
  ): Promise<BugtrackerUserEntity> {
    const newUser = this.create(createUserDto);
    await this.save(newUser);
    return newUser;
  }
}
