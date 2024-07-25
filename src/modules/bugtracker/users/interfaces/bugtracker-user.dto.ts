import { BugtrackerUserEntity } from '../entity/bugtracker-user.entity';

export interface BugtrackerUserWithProjects extends BugtrackerUserEntity {
  hasProjects?: any;
}
