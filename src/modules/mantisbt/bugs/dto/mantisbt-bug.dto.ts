import { Expose } from 'class-transformer';

export class MantisbtBugDto {
  @Expose()
  id: number;

  @Expose()
  projectId: number;

  @Expose()
  summary: string;
}
