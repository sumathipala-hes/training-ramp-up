import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { Student } from "../entity/Student";

export class StudentController {
  private studentRepository = AppDataSource.getRepository(Student);

  async getAllStudents(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    return this.studentRepository.find();
  }

  async getStudent(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);

    const student = await this.studentRepository.findOne({
      where: { id },
    });

    if (!student) {
      return "unregistered user";
    }
    return student;
  }

  async addStudent(request: Request, response: Response, next: NextFunction) {
    const { name, age, dof, gender, address, mobile } = request.body;

    const user = Object.assign(new Student(), {
      name,
      age,
      dof,
      gender,
      address,
      mobile,
    });

    return this.studentRepository.save(user);
  }

  async deleteStudent(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const id = parseInt(request.params.id);

    let userToRemove = await this.studentRepository.findOneBy({ id });

    if (!userToRemove) {
      return "this user not exist";
    }

    await this.studentRepository.remove(userToRemove);

    return "user has been removed";
  }

  async updateStudent(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const id = parseInt(request.params.id);

    // Find the student by ID
    const student = await this.studentRepository.findOne({
      where: { id },
    });

    if (!student) {
      return "unregistered user";
    }

    // Update the student data
    const { name, age, dof, gender, address, mobile } = request.body;
    student.name = name;
    student.age = age;
    student.dof = dof;
    student.gender = gender;
    student.address = address;
    student.mobile = mobile;

    // Save the updated student to the database
    await this.studentRepository.save(student);
    return "user sucess fully updated";
  }

  // delete all data function
  async deleteAllStudents(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
      this.studentRepository.clear();
      return "all data has been removed";
  }
}
