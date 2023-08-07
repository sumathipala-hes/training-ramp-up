import express from 'express';
import {
  requestCreateStudent,
  requestDeleteStudent,
  requestGetAllStudents,
  requestUpdateStudent,
} from '../controllers/student.controller';

const router = express.Router();

router.get('/', requestGetAllStudents);
router.post('/', requestCreateStudent);
router.put('/:id', requestUpdateStudent);
router.delete('/:id', requestDeleteStudent);

export default router;
