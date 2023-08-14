import express from 'express'
import { createStudent, deleteStudent, getAllStudents, updateStudent } from '../controllers/studentControllers'
const router = express.Router()

router.route('/api/student').post(createStudent).get(getAllStudents)

router.route('/api/student/:studentId').put(updateStudent).delete(deleteStudent)

export { router as createStudentRouter }
