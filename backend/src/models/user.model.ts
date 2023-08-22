import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  email!: number;

  @Column()
  name!: string;

  @Column()
  password!: string;

  @Column()
  role!: string;
}
