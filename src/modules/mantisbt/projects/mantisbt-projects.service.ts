import { Injectable } from '@nestjs/common';
import { MantisbtProjectsRepository } from './mantisbt-projects.repository';
import { mantisbtProjectRelations } from './entity/mantisbt-project.entity';

@Injectable()
export class MantisbtProjectsService {
  constructor(
    private readonly mantisbtProjectsRepository: MantisbtProjectsRepository,
  ) {}

  async findProject(id: number, { select = null } = {}) {
    return await this.mantisbtProjectsRepository.findOne({
      select,
      where: { id },
      relations: [mantisbtProjectRelations.category],
    });
  }

  async findProjects({ select = null, page = 1, size = 10 } = {}) {
    return await this.mantisbtProjectsRepository.find({
      select,
      take: size,
      skip: size * (page - 1),
      relations: [mantisbtProjectRelations.category],
    });
  }

  async findMyProjects(userId: number) {
    return await this.mantisbtProjectsRepository.findProjectsByUserId(userId);
  }
}
