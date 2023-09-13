/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';
import { AppRoles } from './util/Roles';
import * as bcrypt from 'bcryptjs';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  userName: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: AppRoles,
    array: true,
    default: [AppRoles.USER],
  })
  roles: AppRoles;

  @BeforeInsert()
  async beforeInsert() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 12); // Hash the password
      //Delete Password Confirm Field
    }
  }

  public async correctPassword(
    candidatePassword: string,
    userPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(candidatePassword, userPassword);
  }
}
