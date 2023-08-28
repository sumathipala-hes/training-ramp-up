import express from 'express'
import { createStudent, deleteStudent, getAllStudents, updateStudent } from '../controllers/studentControllers'
import { check } from 'express-validator'
import {
  getAllUsers,
  signUp,
  logIn,
  protect,
  deleteUser,
  updateUserRole,
  restrictToAdmin,
} from '../controllers/authController'
const router = express.Router()

router
  .route('/api/student')
  .post([check('id').isInt(), check('name').notEmpty(), check('mobile_number').isInt()], createStudent)
  .get(protect, getAllStudents)

router.route('/api/student/:studentId').put(updateStudent).delete(protect, restrictToAdmin, deleteStudent)

/////USER ROUTES
router
  .route('/api/user/sign-up')
  .post([check('email').isEmail(), check('userName').notEmpty(), check('password').notEmpty()], signUp)
router.post('/api/user/log-in', logIn)
router.get('/api/user', getAllUsers)
router.delete('/api/user/:userId', deleteUser)
router.put('/api/user/:userId', updateUserRole)

export { router as userRouter }
