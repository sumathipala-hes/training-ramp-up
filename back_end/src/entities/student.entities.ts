import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  mobileNumber: string;

  @CreateDateColumn()
  dob: Date;

  @Column()
  gender: string;

  constructor(
    id: number,
    name: string,
    address: string,
    mobileNumber: string,
    dob: Date,
    gender: string
  ) {
    this.name = name;
    this.address = address;
    this.mobileNumber = mobileNumber;
    this.dob = dob;
    this.gender = gender;
  }
}
