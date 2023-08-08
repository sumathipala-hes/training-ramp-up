import { RequestHandler, Request, Response } from 'express';
import { retrieveAllStudents, saveStudent, updateStudent } from '../services/student.service';

export default class StudentController {
  addStudent: RequestHandler = async (
    req: Request,
    res: Response,
  ): Promise<Response> => {
    //create operation
    try {
      // get the student data from the request body
      const newStudent = req.body;

      // save the student
      const student = await saveStudent(newStudent);

      return res // return the response
        .status(200)
        .json({ message: 'New student added.!', responseData: student });
    } catch (error: unknown) {
      // catch block is used to handle the errors
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      } else {
        return res.status(500).json({ message: 'Unknown error occured.' });
      }
    }
  };

  retrieveAllStudents: RequestHandler = async (
    req: Request,
    res: Response,
  ): Promise<Response> => {
    //read operation
    try {
      // retrieve all the students
      let students = await retrieveAllStudents();

      return res.status(200).json({ responseData: students });
    } catch (error: unknown) {
      // catch block is used to handle the errors
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      } else {
        return res.status(500).json({ message: 'Unknown error occured.' });
      }
    }
  };

  updateStudent: RequestHandler = async (
    req: Request,
    res: Response,
  ): Promise<Response> => {
    //update operation
    try {
      // get the student data from the request body
      const newStudent = req.body;

      // update the student
      const student = await updateStudent(newStudent);

      return res // return the response
        .status(200)
        .json({ message: 'New student updated.!', responseData: student });
    } catch (error: unknown) {
      // catch block is used to handle the errors
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      } else {
        return res.status(500).json({ message: 'Unknown error occured.' });
      }
    }
  };

  deleteStudent: RequestHandler = async (
    req: Request,
    res: Response,
  ): Promise<Response> => {
    //delete operation
    return res.status(200).json({ message: 'Student deleted successfully' });
  };
}
