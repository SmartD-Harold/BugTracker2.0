import { MantisbtProjectEntity } from '../../../mantisbt/projects/entity/mantisbt-project.entity';
import { MantisbtCategoryEntity } from '../../../mantisbt/categories/entity/mantisbt-category.entity';
import {
  PriorityType,
  ReproducibilityType,
  SeverityType,
  StatusType,
} from '../../../mantisbt/bugs/interfaces';

export interface SettingsIssuesType {
  projects: MantisbtProjectEntity[];
  categories: MantisbtCategoryEntity[];
  statuses: StatusType;
  priorities: PriorityType;
  severities: SeverityType;
  reproducibility: ReproducibilityType;
}
