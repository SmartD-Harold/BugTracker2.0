import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('mantis_bugnote_text_table')
export class MantisbtBugNoteTextEntity {
  @PrimaryGeneratedColumn('increment', { unsigned: true })
  id: number;

  @Column({ type: 'longtext', default: '' })
  note: string;
}
