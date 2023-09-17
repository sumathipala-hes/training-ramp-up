import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  studentId: number;

  @Column({ nullable: false })
  studentName: string;

  @Column({ nullable: false })
  studentAddress: string;

  @Column({ nullable: false })
  studentMobile: string;

  @Column({ nullable: false })
  studentDob: Date;

  @Column({ nullable: false })
  studentGender: string;
}
