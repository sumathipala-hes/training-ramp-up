import { Router } from 'express';
import {
  createStudent,
  deleteUser,
  getStudents,
  updateStudent,
} from '../controllers/student.controllers';

const router = Router();

router.post('/students', createStudent);

router.get('/students', getStudents);

router.put('/students/:id', updateStudent);

router.delete('/students/:id', deleteUser);

export default router;
