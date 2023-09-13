/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Student {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  age: string;

  @Column()
  date_of_birth: Date;

  @Column()
  gender: string;

  @Column()
  mobile_number: number;

  @Column()
  address: string;
}
