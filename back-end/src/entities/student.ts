import { Entity, BaseEntity, Column, PrimaryColumn } from 'typeorm'

@Entity('student')
export class Student extends BaseEntity {
  @PrimaryColumn()
  id?: number

  @Column()
  name?: string

  @Column()
  age?: string

  @Column()
  dateofbirth?: Date

  @Column()
  mobilenumber?: number

  @Column()
  address?: string
}
