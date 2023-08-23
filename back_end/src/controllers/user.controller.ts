import { RequestHandler, Request, Response } from 'express';

export default class UserController {
  registerUser: RequestHandler = async (
    req: Request,
    res: Response,
  ): Promise<Response> => {
    //create operation
    return res.json({ message: 'registerUser' });
  };

  retrieveAllUsers: RequestHandler = async (
    req: Request,
    res: Response,
  ): Promise<Response> => {
    //read operation
    return res.json({ message: 'retrieveAllUsers' });
  };

  updateUser: RequestHandler = async (
    req: Request,
    res: Response,
  ): Promise<Response> => {
    //update operation
    return res.json({ message: 'updateUser' });
  };

  deleteUser: RequestHandler = async (
    req: Request,
    res: Response,
  ): Promise<Response> => {
    //delete operation
    return res.json({ message: 'deleteUser' });
  };

  signIn: RequestHandler = async (
    req: Request,
    res: Response,
  ): Promise<Response> => {
    //signIn operation
    return res.json({ message: 'signIn' });
  };

  signOut: RequestHandler = async (
    req: Request,
    res: Response,
  ): Promise<Response> => {
    //signOut operation
    return res.json({ message: 'signOut' });
  };
}
