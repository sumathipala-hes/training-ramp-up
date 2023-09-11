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
  logOut,
  registerUser,
  refreshToken,
} from '../controllers/authController'
const router = express.Router()

/////USER ROUTES
router
  .route('/api/user/sign-up')
  .post([check('email').isEmail(), check('userName').notEmpty(), check('password').notEmpty()], signUp)
router
  .route('/api/user/register-user')
  .post([check('email').isEmail(), check('userName').notEmpty(), check('password').notEmpty()], registerUser)
router.post('/api/user/log-in', logIn)
router.get('/api/user', protect, restrictToAdmin, getAllUsers)
router.delete('/api/user/:userId', protect, restrictToAdmin, deleteUser)
router.put('/api/user/:userId', protect, restrictToAdmin, updateUserRole)
router.post('/api/user/log-out', logOut)
router.post('/api/user/refresh-token', refreshToken)

router
  .route('/api/student')
  .post([check('id').isInt(), check('name').notEmpty(), check('mobile_number').isInt()], createStudent)
  .get(protect, getAllStudents)

router.route('/api/student/:studentId').put(updateStudent).delete(protect, restrictToAdmin, deleteStudent)

export { router as userRouter }
