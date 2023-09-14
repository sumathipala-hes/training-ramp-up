import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Student {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  mobileNumber: string;

  @CreateDateColumn({ nullable: true })
  dob: Date;

  @Column({ nullable: true, enum: ['Male', 'Female'] })
  gender: string;
}
