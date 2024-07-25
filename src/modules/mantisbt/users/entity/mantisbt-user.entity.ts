import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('mantis_user_table')
export class MantisbtUserEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ type: 'varchar', length: 191, name: 'username' })
  userName: string;

  @Column({ type: 'varchar', length: 191, name: 'realname' })
  realName: string;

  @Column({ type: 'varchar', length: 191 })
  email: string;

  @Column({ type: 'varchar', length: 64 })
  password: string;

  @Column({ type: 'tinyint', width: 4, default: 1 })
  enabled: number;

  @Column({ type: 'tinyint', width: 4, default: 0 })
  protected: number;

  //$s_access_levels_enum_string = '10:viewer,25:reporter,40:updater,55:developer,70:manager,90:administrator';
  //$s_access_levels_enum_string = '10:檢視者,25:回報人,40:更新者,55:開發者,70:專案管理者,90:系統管理者';
  @Column({ type: 'smallint', width: 6, default: 10 })
  accessLevel: number;

  @Column({ type: 'int', width: 11, default: 0 })
  loginCount: number;

  @Column({ type: 'smallint', width: 6, default: 0 })
  lostPasswordRequestCount: number;

  @Column({ type: 'smallint', width: 6, default: 0 })
  failedLoginCount: number;

  @Column({ type: 'varchar', length: 64, default: '' })
  cookieString: string;

  @Column({ type: 'int', width: 10, unsigned: true })
  lastVisit: number;

  @Column({ type: 'int', width: 10, unsigned: true })
  dateCreated: number;
}
