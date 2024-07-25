import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export const BUG_TRACKER_TOKEN = 'BUG_TRACKER_TOKEN';
@Entity('mantis_api_token_table')
export class MantisbtRestApiTokenEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ type: 'int', width: 10, unsigned: true })
  userId: number;

  @Column({ type: 'varchar', length: 128 })
  name: string;

  @Column({ type: 'varchar', length: 128 })
  hash: string;

  @Column({ type: 'int', width: 10, unsigned: true })
  dateCreated: number;

  @Column({ type: 'int', width: 10, unsigned: true })
  date_used: number;
}
