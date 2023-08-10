import {Request, Response} from 'express'; 

export const initializeApp = (req: Request, res: Response) => {
  res.send('Hello World from the controller!');
}

module.exports =  {
  initializeApp
};