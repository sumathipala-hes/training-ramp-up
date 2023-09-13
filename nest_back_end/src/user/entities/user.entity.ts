import { Entity, Column, BaseEntity, PrimaryColumn } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @Column()
  userName: string;

  @PrimaryColumn({ unique: true })
  userEmail: string;

  @Column()
  userPassword: string;

  @Column()
  role: string;
}
