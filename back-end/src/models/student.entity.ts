import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Student {
  @PrimaryColumn()
  id!: number;

  @Column({
    length: 100,
  })
  name!: string;

  @Column()
  gender!: string;

  @Column()
  address!: string;

  @Column()
  mobile!: string;

  @Column()
  birthday!: string;

  @Column()
  age!: number;
}
