import { Entity, Column, CreateDateColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @Column({ nullable: true, enum: ['ADMIN', 'USER'], default: 'USER' })
  roleType: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  address: string;

  @PrimaryColumn({ unique: true })
  email: string;

  @Column({ nullable: true })
  mobileNumber: string;

  @CreateDateColumn({ nullable: true })
  dob: Date;

  @Column({ nullable: true, enum: ['Male', 'Female'] })
  gender: string;

  @Column({ nullable: true })
  password: string;
}
