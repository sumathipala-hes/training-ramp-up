import express, { Router } from 'express';
import {
  addStudents,
  deleteStudents,
  retriveAllStudents,
  updateStudents,
} from '../controllers/student.controller';
import { validateStudent } from '../middleware/validation.middleware';

const router: Router = express.Router();

router.get('/', retriveAllStudents);
router.post('/', validateStudent, addStudents);
router.put('/:id', validateStudent, updateStudents);
router.delete('/:id', deleteStudents);

export default router;
