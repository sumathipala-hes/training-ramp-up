import { Request, RequestHandler, Response } from 'express';
import {
  createStudent,
  deleteStudent,
  getAllStudents,
  updateStudent,
} from '../services/student.service';

export const requestGetAllStudents: RequestHandler = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const students = await getAllStudents();
    return res
      .status(200)
      .json({ data: students, message: 'Students found successfully' });
  } catch (error: any) {
    if (error.message === 'Student not found') {
      return res.status(400).json({ message: 'Student not found' });
    } else {
      return res.status(500).json({ message: 'An error occurred' });
    }
  }
};

export const requestCreateStudent: RequestHandler = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const studentData = req.body;
  try {
    const newStudent = await createStudent(studentData);
    return res.status(200).json({
      message: 'Student created successfully',
      data: newStudent,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error creating student', error });
  }
};

export const requestUpdateStudent: RequestHandler = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const { id } = req.params;
  const studentData = req.body;
  try {
    const updatedStudent = await updateStudent(id, studentData);

    return res.status(200).json({
      message: 'Student updated successfully',
      data: updatedStudent,
    });
  } catch (error: any) {
    if (error.message === 'Student not found') {
      return res.status(400).json({ message: 'Student not found' });
    } else {
      return res.status(500).json({ message: 'An error occurred' });
    }
  }
};

export const requestDeleteStudent: RequestHandler = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const { id } = req.params;
  try {
    const deletedStudent = await deleteStudent(id);

    return res.status(200).json({
      message: 'Student deleted successfully',
      data: deletedStudent,
    });
  } catch (error: any) {
    if (error.message === 'Student not found') {
      return res.status(400).json({ message: 'Student not found' });
    } else {
      return res.status(500).json({ message: 'An error occurred' });
    }
  }
};
