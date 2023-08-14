import { Student } from '../entities/student'
import { Request, Response } from 'express'
import { createStudentDB, deleteStudentDB, updateStudentDB } from '../services/studentServices'

const createStudent = async (req: Request, res: Response) => {
  const { id, name, age, gender, mobilenumber, address } = req.body

  const dateofbirth = new Date(req.body.dateofbirth)

  const student = createStudentDB(id, name, age, dateofbirth, gender, mobilenumber, address)

  return res.send(student)
}

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const students = await Student.find()
    return res.json(students)
  } catch (err) {
    console.error('Error No Students')
  }
}

const updateStudent = async (req: Request, res: Response) => {
  const { studentId } = req.params
  const { id, name, age, gender, mobilenumber, address } = req.body
  const dateofbirth = new Date(req.body.dateofbirth)
  const newData = { id, name, age, gender, mobilenumber, address, dateofbirth }
  const updatedStudent = updateStudentDB(parseInt(studentId), newData)

  return res.send(updatedStudent)
}

const deleteStudent = async (req: Request, res: Response) => {
  const { studentId } = req.params
  const response = await deleteStudentDB(parseInt(studentId))

  return res.json(response)
}

export { createStudent, getAllStudents, updateStudent, deleteStudent }
