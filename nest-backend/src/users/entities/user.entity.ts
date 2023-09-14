import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn()
  email: string;
  @Column({ nullable: false })
  name: string;
  @Column({ nullable: false })
  password: string;
  @Column({ nullable: false, enum: ['admin', 'user'] })
  role: string;
}
