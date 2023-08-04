import { Request, Response } from 'express';
import StudentService from '../services/StudentService';

class StudentController {
  public getAllStudents(req: Request, res: Response) {
    const students = StudentService.getAllStudents();
    res.json({ message: 'Students loadall successfully', students });
  }

  public getStudentById(req: Request, res: Response) {
    const { id } = req.params;

    const student = StudentService.getStudentById(id);
    res.json({ message: 'Student found successfully', student });
  }

  public createStudent(req: Request, res: Response) {
    const studentData = req.body;

    const newStudent = StudentService.createStudent(studentData);
    res.json({ message: 'Student created successfully', newStudent });
  }

  public updateStudent(req: Request, res: Response) {
    const { id } = req.params;
    const studentData = req.body;

    const updatedStudent = StudentService.updateStudent(id, studentData);
    res.json({ message: 'Student updated successfully', updatedStudent });
  }

  public deleteStudent(req: Request, res: Response) {
    const { id } = req.params;

    StudentService.deleteStudent(id);
    res.json({ message: 'Student deleted successfully', id });
  }
}

export default new StudentController();
