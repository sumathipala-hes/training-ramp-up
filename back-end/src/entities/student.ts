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
  date_of_birth?: Date

  @Column()
  gender?: string

  @Column()
  mobile_number?: number

  @Column()
  address?: string
}
