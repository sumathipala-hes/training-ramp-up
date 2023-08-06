import { Request, RequestHandler, Response } from 'express';

export const retriveAllStudents: RequestHandler = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  return res.status(200).json({ message: 'Get all students' });
};

export const addStudents: RequestHandler = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  return res.status(200).json({ message: 'Save student' });
};

export const updateStudents: RequestHandler = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  return res.status(200).json({ message: 'Update student' });
};

export const deleteStudents: RequestHandler = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  return res.status(200).json({ message: 'Delete student' });
};
