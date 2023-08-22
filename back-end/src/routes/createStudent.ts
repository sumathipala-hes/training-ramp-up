import express from 'express'
import { createStudent, deleteStudent, getAllStudents, updateStudent } from '../controllers/studentControllers'
import { check } from 'express-validator'
const router = express.Router()

router
  .route('/api/student')
  .post([check('id').isInt(), check('name').notEmpty(), check('mobile_number').isInt()], createStudent)
  .get(getAllStudents)

router.route('/api/student/:studentId').put(updateStudent).delete(deleteStudent)

export { router as createStudentRouter }
