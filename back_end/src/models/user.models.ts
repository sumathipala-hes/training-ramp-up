import { Entity, Column, CreateDateColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @Column()
  roleType!: string;

  @Column()
  name!: string;

  @Column()
  address!: string;

  @PrimaryColumn()
  email!: string;

  @Column()
  mobileNumber!: string;

  @CreateDateColumn()
  dob!: Date;

  @Column()
  gender!: string;

  @Column()
  password!: string;
}
