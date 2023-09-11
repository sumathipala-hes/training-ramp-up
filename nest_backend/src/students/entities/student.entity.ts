import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Student {
  @PrimaryGeneratedColumn({ type: 'int' })
  id!: number;

  @Column({ nullable: false })
  name!: string;

  @Column({ nullable: false })
  address!: string;

  @Column({ nullable: false })
  mobileNumber!: string;

  @CreateDateColumn({ nullable: false })
  dob!: Date;

  @Column({ nullable: false, enum: ['Male', 'Female'] })
  gender!: string;
}
