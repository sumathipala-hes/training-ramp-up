import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Student extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    length: 100,
  })
  name!: string;

  @Column()
  gender!: string;

  @Column({
    length: 100,
  })
  address!: string;

  @Column()
  dob!: string;

  @Column()
  age!: number;
}
