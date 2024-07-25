import { Injectable } from '@nestjs/common';
import { BugtrackerUserRepository } from '../../bugtracker/users/bugtracker-user.repository';
import { BugtrackerUserRelationEnum } from '../../bugtracker/users/entity/bugtracker-user.entity';
import { BugtrackerEmployeeDepartmentsRepository } from '../../bugtracker/users/bugtracker-employee-departments.repository';
import { BugtrackerRolesRepository } from '../../bugtracker/users/bugtracker-roles.repository';
import { BugtrackerUserService } from '../../bugtracker/users/bugtracker-user.service';

@Injectable()
export class UserService {
  constructor(
    // private readonly bugtrackerEmployeeRepository: BugtrackerUserRepository,
    // private readonly bugtrackerUserRepository: BugtrackerUserRepository,
    // private readonly bugtrackerRolesRepository: BugtrackerRolesRepository,
    private readonly bugtrackerEmployeeDepartmentsRepository: BugtrackerEmployeeDepartmentsRepository,
    private readonly bugtrackerUserService: BugtrackerUserService,
  ) {}

  async handlerData(type: string) {
    switch (type) {
      case 'USER':
        return await this.bugtrackerUserService.findLastedUsers();
      case 'ROLE':
        return await this.bugtrackerUserService.findLastedRoles();
      case 'DEPT':
        return await this.bugtrackerEmployeeDepartmentsRepository.find({
          select: {
            id: true,
            code: true,
            name: true,
            members: true,
            supervisorEmail: true,
            supervisorName: true,
          },
        });
      default:
        return [];
    }
  }
}
