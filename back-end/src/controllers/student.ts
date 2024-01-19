import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Student } from '../models/student';

export class StudentController {
    // Get all students
  async getStudents(req: Request, res: Response) {
    const studentRepository = getRepository(Student);
    const students = await studentRepository.find();
    res.json(students);
  }

  // Add student
  async createStudent(req: Request, res: Response) {
    const student = req.body;
    const studentRepository = getRepository(Student);
    const savedStudent = await studentRepository.save(student);
    res.json(savedStudent);
  }

  // Get student by ID
  async getStudentById(req: Request, res: Response) {
    const id = Number(req.params.id);
    const studentRepository = getRepository(Student);
    const student = await studentRepository.findOne(id);
    if (!student) {
      res.status(404).json({ message: 'Student not found' });
    } else {
      res.json(student);
    }
  }

  // Update student
  async updateStudent(req: Request, res: Response) {
    const id = req.params.id;
    const updatedStudent = req.body;
    const studentRepository = getRepository(Student);
    const student = await studentRepository.findOne(id);
    if (!student) {
      res.status(404).json({ message: 'Student not found' });
    } else {
      await studentRepository.save(updatedStudent);
      res.json(updatedStudent);
    }
  }

  // Delete student
  async deleteStudent(req: Request, res: Response) {
    const id = req.params.id;
    const studentRepository = getRepository(Student);
    const student = await studentRepository.findOne(id);
    if (!student) {
      res.status(404).json({ message: 'Student not found' });
    } else {
      await studentRepository.delete(student);
      res.json({ message: 'Student deleted successfully' });
    }
  }
}
