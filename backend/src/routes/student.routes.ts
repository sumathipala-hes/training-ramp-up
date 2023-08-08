import express, { Router } from 'express';
import {
  addStudents,
  deleteStudents,
  retriveAllStudents,
  updateStudents,
} from '../controllers/student.controller';

const router: Router = express.Router();

router.get('/', retriveAllStudents);
router.post('/', addStudents);
router.put('/:id', updateStudents);
router.delete('/:id', deleteStudents);

export default router;
