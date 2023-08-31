import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @Column()
  userName!: string;

  @PrimaryColumn()
  userEmail!: string;

  @Column()
  userPassword!: string;

  @Column()
  role!: string;
}
