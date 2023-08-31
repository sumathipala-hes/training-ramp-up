import { Student } from '../entities/student'
import { Request, Response } from 'express'
import { createStudentDB, deleteStudentDB, updateStudentDB } from '../services/studentServices'
import { validationResult } from 'express-validator'

const createStudent = async (req: Request, res: Response) => {
  const errors = validationResult(req)
  console.log(errors)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  const { id, name, age, gender, mobile_number, address } = req.body

  const date_of_birth = new Date(req.body.date_of_birth)

  const student = createStudentDB(id, name, age, date_of_birth, gender, mobile_number, address)

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
  const { id, name, age, gender, mobile_number, address } = req.body
  const date_of_birth = new Date(req.body.date_of_birth)
  const newData = { id, name, age, gender, mobile_number, address, date_of_birth }
  const updatedStudent = updateStudentDB(parseInt(studentId), newData)

  return res.send(updatedStudent)
}

const deleteStudent = async (req: Request, res: Response) => {
  const { studentId } = req.params
  const response = await deleteStudentDB(parseInt(studentId))

  return res.json({ status: 'success', response })
}

export { createStudent, getAllStudents, updateStudent, deleteStudent }
