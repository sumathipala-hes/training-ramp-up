import { RequestHandler, Request, Response } from 'express';

export default class StudentController {
  addStudent: RequestHandler = async (
    req: Request,
    res: Response,
  ): Promise<Response> => {
    //create operation
    return res.status(201).json({ message: 'Student added successfully' });
  };

  retrieveAllStudents: RequestHandler = async (
    req: Request,
    res: Response,
  ): Promise<Response> => {
    //read operation
    return res.status(200).json({ message: 'All students retrieved' });
  };

  updateStudent: RequestHandler = async (
    req: Request,
    res: Response,
  ): Promise<Response> => {
    //update operation
    return res.status(200).json({ message: 'Student updated successfully' });
  };

  deleteStudent: RequestHandler = async (
    req: Request,
    res: Response,
  ): Promise<Response> => {
    //delete operation
    return res.status(200).json({ message: 'Student deleted successfully' });
  };
}
