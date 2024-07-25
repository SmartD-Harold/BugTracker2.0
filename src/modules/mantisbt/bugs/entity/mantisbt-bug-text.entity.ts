import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('mantis_bug_text_table')
export class MantisbtBugTextEntity {
  @PrimaryGeneratedColumn('increment', { unsigned: true })
  id: number;

  @Column({ type: 'longtext', default: '' })
  description: string;

  @Column({ type: 'longtext', default: '' })
  stepsToReproduce: string;

  @Column({ type: 'longtext', default: '' })
  additionalInformation: string;
}
