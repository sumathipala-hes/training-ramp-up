import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('Student')
export class Student {
  @PrimaryColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  gender!: string;

  @Column()
  address!: string;

  @Column()
  mobileNumber!: string;

  @Column({ type: 'date' })
  dateofbirth!: string;

  @Column()
  age!: number;
}
