import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

//define student table
@Entity()
export class Student {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({
        length: 100,
    })
    name!: string

    @Column()
    gender!: string

    @Column()
    address!: string

    @Column()
    mobile!: string

    @Column()
    birthday!: string

    @Column()
    age!: number
}