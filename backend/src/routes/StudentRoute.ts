import express, { Router } from 'express';
import {
  addStudents,
  deleteStudents,
  retriveAllStudents,
  updateStudents,
} from '../controller/StudentController';

const router: Router = express.Router();

router.get('/', retriveAllStudents);
router.post('/', addStudents);
router.put('/', updateStudents);
router.delete('/', deleteStudents);

export default router;
