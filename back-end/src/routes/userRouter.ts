import express from 'express'
import { createStudent, deleteStudent, getAllStudents, updateStudent } from '../controllers/studentControllers'
import { check } from 'express-validator'
import { getAllUsers, signUp, logIn } from '../controllers/authController'
const router = express.Router()

router
  .route('/api/student')
  .post([check('id').isInt(), check('name').notEmpty(), check('mobile_number').isInt()], createStudent)
  .get(getAllStudents)

router.route('/api/student/:studentId').put(updateStudent).delete(deleteStudent)

router.post('/api/user/sign-up', signUp)
router.post('/api/user/log-in', logIn)
router.get('/api/user', getAllUsers)

export { router as userRouter }
