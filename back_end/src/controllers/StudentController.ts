import { Request, Response } from 'express';
import StudentService from '../services/StudentService';

class StudentController {
  public getAllStudents(req: Request, res: Response) {
    const students = StudentService.getAllStudents();
    res.json(students);
  }

  public getStudentById(req: Request, res: Response) {
    const { id } = req.params;

    const student = StudentService.getStudentById(id);
    res.json(student);
  }

  public createStudent(req: Request, res: Response) {
    const studentData = req.body;

    const newStudent = StudentService.createStudent(studentData);
    res.json(newStudent);
  }

  public updateStudent(req: Request, res: Response) {
    const { id } = req.params;
    const studentData = req.body;

    const updatedStudent = StudentService.updateStudent(id, studentData);
    res.json(updatedStudent);
  }

  public deleteStudent(req: Request, res: Response) {
    const { id } = req.params;

    StudentService.deleteStudent(id);
    res.json({ message: 'Student deleted successfully' });
  }
}

export default new StudentController();
