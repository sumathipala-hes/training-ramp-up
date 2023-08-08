import express, { Router } from "express";
import StudentController from "../controllers/student.controller";

export default class UserRoutes {
  private router: Router = express.Router();
  private studentController: StudentController = new StudentController();

  constructor() {
    this.configRoutes();
  }

  private configRoutes = (): void => {
     //POST /api/v1/student
     this.router.post("/", this.studentController.addStudent);
  };

  public getRouter = (): Router => {
    return this.router;
  };
}
