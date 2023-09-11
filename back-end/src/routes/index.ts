import express from 'express';
import {addStudent,getStudents, deleteStudent, updateStudent} from '../controllers/student';
import { idValidRules, loginRules, regRules, stuValidRules } from '../middlewares/expressValiator';
import { authUser, logoutUser, newAccessToken, registerUser, validateUser } from '../controllers/user';
import { userRoles } from '../utils';
import { roleValidator } from '../middlewares/roleValidator';

const allUsers = [userRoles.admin, userRoles.user];
//add routers from controllers
const router = express.Router();
router.post('/add-student', stuValidRules, roleValidator([userRoles.admin]), addStudent)
router.get('/get-students',roleValidator(allUsers), getStudents);
router.post('/update-student',stuValidRules, roleValidator([userRoles.admin]), updateStudent);
router.post('/remove-student', idValidRules, roleValidator([userRoles.admin]), deleteStudent);
router.post('/register', regRules, registerUser);
router.post('/login', loginRules, validateUser);
router.get('/log-out',roleValidator(allUsers), logoutUser);
router.post('/auth', roleValidator(allUsers) ,authUser);
router.post('/auth-token', newAccessToken)
export default router;