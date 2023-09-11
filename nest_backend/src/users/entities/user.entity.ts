import { Entity, Column, CreateDateColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @Column({ nullable: false, enum: ['ADMIN', 'USER'], default: 'USER' })
  roleType!: string;

  @Column({ nullable: false })
  name!: string;

  @Column({ nullable: false })
  address!: string;

  @PrimaryColumn({ unique: true, nullable: false })
  email!: string;

  @Column({ nullable: false })
  mobileNumber!: string;

  @CreateDateColumn({ nullable: false })
  dob!: Date;

  @Column({ nullable: false, enum: ['Male', 'Female'] })
  gender!: string;

  @Column({ nullable: false })
  password!: string;
}
