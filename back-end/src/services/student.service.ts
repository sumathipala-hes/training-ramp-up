import { StudentData } from '../interfaces/student.interface';
import { Student } from '../models/student';

export const createStudentService = async (data: StudentData) => {
  if (!data.name || !data.gender || !data.address || !data.dob || !data.age) {
    throw new Error('Missing required data for creating a student');
  }

  const { name, gender, address, dob, age } = data;

  const student = new Student();
  student.name = name;
  student.gender = gender;
  student.address = address;
  student.dob = dob;
  student.age = age;

  await student.save();
  return student;
};

export const getStudentsService = async () => {
  const students = await Student.find();
  return students;
};

export const updateStudentService = async (id: string, data: StudentData) => {
  const student = await Student.findOneBy({ id: parseInt(id) });

  if (!student) {
    throw new Error('Student does not exists');
  }

  await Student.update({ id: parseInt(id) }, data);
};

export const deleteStudentService = async (id: string) => {
  const result = await Student.delete({ id: parseInt(id) });

  if (result.affected === 0) {
    throw new Error('Student not found ');
  }
};
