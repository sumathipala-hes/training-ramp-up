import { Entity, Column, PrimaryColumn } from 'typeorm';

//define user table
@Entity()
export class User {
  @PrimaryColumn()
  username!: string;

  @Column()
  name!: string;

  @Column()
  role!: string;

  @Column()
  password!: string;

  @Column()
  refreshToken!: string;
}
