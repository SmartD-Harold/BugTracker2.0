import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Type } from 'class-transformer';
import { BugtrackerIssueEntity } from './bugtracker-issue.entity';

export const BugtrackerIssueFileRelationEnum = {
  BUG: 'bug',
};

@Entity('bug_files')
export class BugtrackerIssueFilesEntity {
  @PrimaryGeneratedColumn('increment', { unsigned: true })
  id: number;

  //https://github.com/ai/nanoid
  @Column({
    type: 'char',
    length: 21,
  })
  nanoid: string;

  @Column({ type: 'int', width: 11, unsigned: true, nullable: true })
  bugId: number;

  @Column({ type: 'int', width: 11, unsigned: true, nullable: true })
  bugNoteId: number;

  // MIME types (IANA media types)
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types
  @Column({ type: 'varchar', length: 250, nullable: true })
  contentType: string;

  @Column({ type: 'varchar', length: 250 })
  originalName: string;

  @Column({ type: 'varchar', length: 250 })
  destination: string;

  @Column({ type: 'varchar', length: 250 })
  filename: string;

  @Column({ type: 'int', width: 11, unsigned: true, default: 0 })
  filesize: number;

  @Column({ type: 'int', width: 11, unsigned: true, nullable: true })
  userId: number;

  @Column({ type: 'uuid', nullable: true })
  uuid: string;

  @Type(() => BugtrackerIssueEntity)
  @ManyToOne(() => BugtrackerIssueEntity, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn()
  bug: BugtrackerIssueEntity;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  @Type(() => Date)
  createdAt: Date;

  @DeleteDateColumn({
    type: 'timestamp',
  })
  @Type(() => Date)
  deletedAt?: Date;
}
