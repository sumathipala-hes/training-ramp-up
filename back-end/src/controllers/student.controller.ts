import { Request, Response } from 'express';
import {
  createStudentService,
  getStudentsService,
  updateStudentService,
  deleteStudentService,
} from '../services/student.service';
import { validationResult } from 'express-validator';
import { createStudentValidationRules } from '../validations';

export const createStudent = async (req: Request, res: Response) => {
  const tempReq = req;
  await Promise.all(createStudentValidationRules.map((validation) => validation.run(tempReq)));

  const errors = validationResult(tempReq);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const student = await createStudentService(req.body);
    return res.json(student);
  } catch (err) {
    if (err instanceof Error) {
      return res.status(400).json({ message: err.message });
    }
  }
};

export const getStudents = async (req: Request, res: Response) => {
  try {
    const students = await getStudentsService();
    res.json(students);
  } catch (err) {
    if (err instanceof Error) {
      return res.status(400).json({ message: err.message });
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
      return res.status(400).json({ message: err.message });
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
      return res.status(400).json({ message: err.message });
    }
  }
};
