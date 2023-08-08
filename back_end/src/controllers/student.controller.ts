import { RequestHandler, Request, Response } from "express";

export default class StudentController {
  addStudent: RequestHandler = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    //create operation
    return res;
  };

  retrieveAllStudents: RequestHandler = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    //read operation
    return res;
  };

  updateStudent: RequestHandler = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    //update operation
    return res;
  };

  deleteStudent: RequestHandler = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    //delete operation
    return res;
  };
}
