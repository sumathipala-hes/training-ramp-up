import { Request, RequestHandler, Response } from 'express';
import {
  deleteStudent,
  getAllStudents,
  saveStudent,
  updateStudent,
} from '../services/student.service';
import validations from '../utils/validation_util';

export const retriveAllStudents: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const students = await getAllStudents();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const addStudents: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const clientErrors = validations(req.body);
    if (clientErrors.length > 0) {
      res.status(400).json(clientErrors);
      return;
    }
    const student = await saveStudent(req.body);
    res.status(200).json(student);
  } catch (error) {
    console.log(error);
    res.status(500).json('error');
  }
};

export const updateStudents: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const clientErrors = validations(req.body);
    if (clientErrors.length > 0) {
      res.status(400).json(clientErrors);
      return;
    }
    const student = await updateStudent(req.params.id, req.body);
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteStudents: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const student = await deleteStudent(req.params.id);
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json(error);
  }
};
