import { Injectable } from '@nestjs/common';
import { MantisbtApiUsersRepository } from './mantisbt-api-users.repository';
import { CreateMantisbtApiUserDto } from './dto/create-mantisbt-api-user.dto';
import { MantisbtUserAccessLevel } from './types/mantisbt-api-users.enum';
import { ConfigService } from '@nestjs/config';
import { ConfigurationKey } from '../../../../config/configuration.config';

@Injectable()
export class MantisbtApiUsersService {
  private apiToken: string;
  constructor(
    public configService: ConfigService,
    private readonly mantisbtUsersRepository: MantisbtApiUsersRepository,
  ) {
    this.apiToken = this.configService.get<string>(
      ConfigurationKey.mantisbt.api.token,
    );
    this.mantisbtUsersRepository.setConfig({
      token: this.apiToken,
    });
  }

  async getUser(userId: number) {
    return this.mantisbtUsersRepository.getUserById(userId);
  }

  async createUser(createUserDto: CreateMantisbtApiUserDto) {
    const user = {
      // Default
      enabled: true,
      protected: false,
      accessLevel: {
        name: MantisbtUserAccessLevel.updater,
      },
      // Override
      ...createUserDto,
    };

    return this.mantisbtUsersRepository.createUser(user);
  }

  async createTokenByUser(userId: number) {
    return this.mantisbtUsersRepository.createTokenByUserId(userId);
  }

  async deleteUser(id: number) {
    await this.mantisbtUsersRepository.deleteUserById(id);
  }

  async deleteAPITokenByUser({ id, userId }: { id: number; userId: number }) {
    await this.mantisbtUsersRepository.deleteAPITokenByUserId(id, userId);
  }
}
