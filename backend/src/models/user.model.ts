import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  email!: number;

  @Column()
  name!: string;

  @Column()
  password!: string;

  @Column()
  role!: string;
}
