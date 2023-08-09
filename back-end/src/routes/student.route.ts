import { Router } from 'express';
import {
  createStudent,
  deleteStudent,
  getStudents,
  updateStudent,
} from '../controllers/student.controller';

const router = Router();

router.post('/students', createStudent);

router.get('/students', getStudents);

router.put('/students/:id', updateStudent);

router.delete('/students/:id', deleteStudent);

export default router;
