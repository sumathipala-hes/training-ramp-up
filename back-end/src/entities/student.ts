import { Entity, BaseEntity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity('student')
export class Student extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number

  @Column()
  name?: string

  @Column()
  age?: string

  @Column()
  dateofbirth?: Date

  @Column()
  gender?: string

  @Column()
  mobilenumber?: number

  @Column()
  address?: string
}
