import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { MantisbtUserEntity } from './entity/mantisbt-user.entity';

@Injectable()
export class MantisbtUsersRepository extends Repository<MantisbtUserEntity> {
  constructor(protected dataSource: DataSource) {
    super(MantisbtUserEntity, dataSource.createEntityManager());
  }
  async getUserById(id: number): Promise<MantisbtUserEntity> {
    return this.findOne({
      where: {
        id,
      },
    });
  }

  async getUserByEmail(email: string): Promise<MantisbtUserEntity> {
    return this.findOne({
      where: {
        email,
      },
    });
  }

  async findUsers(): Promise<MantisbtUserEntity[]> {
    const users = await this.find();
    return users;
  }
}
