import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { Student } from "../entity/Student"

export class StudentController {

    private studentRepository = AppDataSource.getRepository(Student)

    async all(request: Request, response: Response, next: NextFunction) {
        return this.studentRepository.find()
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)


        const user = await this.studentRepository.findOne({
            where: { id }
        })

        if (!user) {
            return "unregistered user"
        }
        return user
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const { firstName, lastName, age } = request.body;

        const user = Object.assign(new Student(), {
            firstName,
            lastName,
            age
        })

        return this.studentRepository.save(user)
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)

        let userToRemove = await this.studentRepository.findOneBy({ id })

        if (!userToRemove) {
            return "this user not exist"
        }

        await this.studentRepository.remove(userToRemove)

        return "user has been removed"
    }

}