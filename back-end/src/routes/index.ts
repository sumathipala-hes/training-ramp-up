import express from 'express';
import {addStudent,getStudents, deleteStudent, updateStudent} from '../controllers/student';
import { idValidRules, loginRules, regRules, stuValidRules } from '../middlewares/expressValiator';
import { authUser, getUsers, logoutUser, registerUser, validateUser } from '../controllers/user';
//add routers from controllers
const router = express.Router();
router.post('/add-student', stuValidRules, addStudent)
router.get('/get-students', getStudents);
router.post('/update-student',stuValidRules, updateStudent);
router.post('/remove-student', idValidRules, deleteStudent);
router.post('/register', regRules, registerUser);
router.get('/get-users', getUsers);
router.post('/login', loginRules, validateUser);
router.get('/log-out', logoutUser);
router.post('/auth', authUser)
export default router;