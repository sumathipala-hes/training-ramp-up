import express from 'express';
import addStudent from '../controllers/addStudent';
import getStudents from '../controllers/getStudents';
import updateStudent from '../controllers/updateStudent';
import deleteStudent from '../controllers/deleteStudent';

//add routers from controllers
const router = express.Router();
router.post('/add-student',addStudent)
router.get('/get-students', getStudents);
router.post('/update-student', updateStudent);
router.post('/remove-student', deleteStudent)

export default router;