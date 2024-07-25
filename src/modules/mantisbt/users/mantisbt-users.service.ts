import { Injectable } from '@nestjs/common';
import { MantisbtUsersRepository } from './mantisbt-users.repository';

@Injectable()
export class MantisbtUsersService {
  constructor(
    private readonly mantisbtUsersRepository: MantisbtUsersRepository,
  ) {}

  async findUserById(id: number) {
    return await this.mantisbtUsersRepository.getUserById(id);
  }

  async findUserByEmail(email: string) {
    return await this.mantisbtUsersRepository.getUserByEmail(email);
  }

  async findUsers() {
    return await this.mantisbtUsersRepository.findUsers();
  }
}
