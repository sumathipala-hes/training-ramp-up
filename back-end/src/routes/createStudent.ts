import express from 'express'
import { Student } from '../entities/student'
const router = express.Router()

router.post('/api/student', async (req, res) => {
  const { id, name, age, gender, mobilenumber, address } = req.body

  const dateofbirth = new Date(req.body.dateofbirth)

  const student = Student.create({
    id,
    name,
    age,
    dateofbirth,
    gender,
    mobilenumber,
    address,
  })

  await student.save()

  return res.send(student)
})

router.get('/api/student', async (req, res) => {
  try {
    const students = await Student.find()
    return res.json(students)
  } catch (err) {
    console.error('Error No Students')
  }
})

router.delete('/api/student/:studentId', async (req, res) => {
  const { studentId } = req.params
  const response = await Student.delete(parseInt(studentId))

  return res.json(response)
})

router.put('/api/student/:studentId', async (req, res) => {
  const { studentId } = req.params
  const { id, name, age, gender, mobilenumber, address } = req.body
  const dateofbirth = new Date(req.body.dateofbirth)
  const newData = { id, name, age, gender, mobilenumber, address, dateofbirth }
  const updatedStudent = Student.update(studentId, newData)

  return res.send(updatedStudent)
})

export { router as createStudentRouter }
