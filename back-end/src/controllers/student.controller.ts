import { Request, Response } from 'express';
import {
  createStudentService,
  getStudentsService,
  updateStudentService,
  deleteStudentService,
} from '../services/student.service';

export const createStudent = async (req: Request, res: Response) => {
  try {
    const student = await createStudentService(req.body);
    return res.json(student);
  } catch (err) {
    if (err instanceof Error) {
      return res.status(500).json({ message: err.message });
    }
  }
};

export const getStudents = async (req: Request, res: Response) => {
  try {
    const students = await getStudentsService();
    res.json(students);
  } catch (err) {
    if (err instanceof Error) {
      return res.status(500).json({ message: err.message });
    }
  }
};

export const updateStudent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await updateStudentService(id, req.body);

    return res.sendStatus(204);
  } catch (err) {
    if (err instanceof Error) {
      return res.status(500).json({ message: err.message });
    }
  }
};

export const deleteStudent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await deleteStudentService(id);

    return res.sendStatus(204);
  } catch (err) {
    if (err instanceof Error) {
      return res.status(500).json({ message: err.message });
    }
  }
};
