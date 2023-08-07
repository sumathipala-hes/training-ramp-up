import { Request, RequestHandler, Response } from 'express';
import {
  createStudent,
  deleteStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
} from '../services/student.service';

export const requestGetAllStudents: RequestHandler = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const students = await getAllStudents();
    return res.json({
      message: 'Students found successfully',
      data: students,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error retrieving students', error });
  }
};

export const requestGetStudentById: RequestHandler = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  try {
    const student = await getStudentById(id);
    if (student === undefined) {
      return res.status(404).json({ message: 'Student not found' });
    }
    return res.json({ message: 'Student found successfully', data: student });
  } catch (error) {
    return res.status(500).json({ message: 'Error retrieving student', error });
  }
};

export const requestCreateStudent: RequestHandler = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const studentData = req.body;
  try {
    const newStudent = await createStudent(studentData);
    return res.json({
      message: 'Student created successfully',
      data: newStudent,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error creating student', error });
  }
};

export const requestUpdateStudent: RequestHandler = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  const studentData = req.body;
  try {
    const updatedStudent = await updateStudent(id, studentData);
    if (updatedStudent === undefined) {
      return res.status(404).json({ message: 'Student not found' });
    }
    return res.json({
      message: 'Student updated successfully',
      data: updatedStudent,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error updating student', error });
  }
};

export const requestDeleteStudent: RequestHandler = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  try {
    const deletedStudent = await deleteStudent(id);
    if (deletedStudent === undefined) {
      return res.status(404).json({ message: 'Student not found' });
    }
    return res.json({
      message: 'Student deleted successfully',
      data: deletedStudent,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting student', error });
  }
};
