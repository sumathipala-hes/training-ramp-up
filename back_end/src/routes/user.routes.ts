import express, { Router } from 'express';
import UserController from '../controllers/user.controller';
import { authenticatePermissions, authorization } from '../middleware/jwt.middleware';
import { userValidator } from '../middleware/validate.user';

export default class UserRoutes {
  private router: Router = express.Router();
  private userController: UserController = new UserController();

  constructor() {
    this.configRoutes();
  }

  private configRoutes = (): void => {
    //POST /api/v1/user
    this.router.post('/', userValidator,this.userController.registerUser);

    //GET /api/v1/user
    this.router.get('/', this.userController.retrieveAllUsers);

    //PUT /api/v1/user/:id
    this.router.put('/:id', authenticatePermissions,userValidator,this.userController.updateUser);

    //DELETE /api/v1/user/:id
    this.router.delete('/:id', authenticatePermissions,this.userController.deleteUser);

    //POST /api/v1/user/signIn
    this.router.post('/signIn', this.userController.signIn);

    //DELETE /api/v1/user/signOut
    this.router.delete('/signOut', authorization,this.userController.signOut);
  };

  public getRouter = (): Router => {
    return this.router;
  };
}
