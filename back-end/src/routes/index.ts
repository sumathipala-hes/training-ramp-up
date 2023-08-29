import express from 'express';
import {addStudent,getStudents, deleteStudent, updateStudent} from '../controllers/student';
import { idValidRules, stuValidRules } from '../middlewares/expressValiator';
//add routers from controllers
const router = express.Router();
router.post('/add-student', stuValidRules, addStudent)
router.get('/get-students', getStudents);
router.post('/update-student',stuValidRules, updateStudent);
router.post('/remove-student', idValidRules, deleteStudent)

export default router;