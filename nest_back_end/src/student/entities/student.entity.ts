import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Student {
    @PrimaryGeneratedColumn()
    studentId!: number;
  
    @Column()
    studentName!: string;
  
    @Column()
    studentAddress!: string;
  
    @Column()
    studentMobile!: string;
  
    @Column()
    studentDob!: Date;
  
    @Column()
    studentGender!: string;
}
