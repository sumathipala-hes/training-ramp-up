import { Request, Response } from 'express';
import { Student } from '../entities/Student';

export const createStudent = async (req: Request, res: Response) => {
  try {
    const { name, gender, address, dob, age } = req.body;

    const student = new Student();
    student.name = name;
    student.gender = gender;
    student.address = address;
    student.dob = dob;
    student.age = age;

    await student.save();

    return res.json(student);
  } catch (err) {
    if (err instanceof Error) {
      return res.status(500).json({ message: err.message });
    }
  }
};

export const getStudents = async (req: Request, res: Response) => {
  Student.find().then((data) => {
    res.json(data);
  });
};

export const updateStudent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const student = await Student.findOneBy({ id: parseInt(req.params.id) });

    if (!student) return res.status(404).json({ message: 'Student does not exists' });

    await Student.update({ id: parseInt(id) }, req.body);

    return res.sendStatus(204);
  } catch (err) {
    if (err instanceof Error) {
      return res.status(500).json({ message: err.message });
    }
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await Student.delete({ id: parseInt(id) });
    if (result.affected === 0) {
      return res.status(404).json({ message: 'Student not found ' });
    }

    return res.sendStatus(204);
  } catch (err) {
    if (err instanceof Error) {
      return res.status(500).json({ message: err.message });
    }
  }
};
