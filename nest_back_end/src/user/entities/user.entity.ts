import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @Column({ nullable: false })
  userName: string;

  @PrimaryColumn({ unique: true, nullable: false })
  userEmail: string;

  @Column({ nullable: false })
  userPassword: string;

  @Column({ nullable: false })
  role: string;
}
