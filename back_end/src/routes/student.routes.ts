import express, { Router } from "express";
import StudentController from "../controllers/student.controller";
import { studentValidator } from "../middleware/validate.student";

export default class StudentRoutes {
  private router: Router = express.Router();
  private studentController: StudentController = new StudentController();

  constructor() {
    this.configRoutes();
  }

  private configRoutes = (): void => {
     //POST /api/v1/student
     this.router.post("/", studentValidator,this.studentController.addStudent);

     //GET /api/v1/student
     this.router.get("/", this.studentController.retrieveAllStudents);
     
     //PUT /api/v1/student/:id
     this.router.put("/:id", studentValidator,this.studentController.updateStudent);
     
     //DELETE /api/v1/student/:id
     this.router.delete("/:id", this.studentController.deleteStudent);
  };

  public getRouter = (): Router => {
    return this.router;
  };
}
