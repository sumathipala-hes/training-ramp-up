import express, { Router } from 'express';
import {
  addStudents,
  deleteStudents,
  retriveAllStudents,
  updateStudents,
} from '../controllers/StudentController';

const router: Router = express.Router();

router.get('/', retriveAllStudents);
router.post('/', addStudents);
router.put('/', updateStudents);
router.delete('/:id', deleteStudents);

export default router;
