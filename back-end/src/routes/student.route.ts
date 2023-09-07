import { Router } from 'express';
import {
  createStudent,
  deleteStudent,
  getStudents,
  updateStudent,
} from '../controllers/student.controller';
import { verifyJWT } from '../middlewares/UserValidations';
import { createStudentValidationRules, validateCreateStudent } from '../middlewares/StudentValidations';

const router = Router();

router.post('/students', verifyJWT, createStudentValidationRules, validateCreateStudent, createStudent);

router.get('/students', verifyJWT, getStudents);

router.put('/students/:id', verifyJWT, updateStudent);

router.delete('/students/:id', verifyJWT, deleteStudent);

export default router;
