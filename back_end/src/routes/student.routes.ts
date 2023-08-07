import express from 'express';
import {
  requestCreateStudent,
  requestDeleteStudent,
  requestGetAllStudents,
  requestGetStudentById,
  requestUpdateStudent,
} from '../controllers/student.controller';

const router = express.Router();

router.get('/', requestGetAllStudents);
router.get('/:id', requestGetStudentById);
router.post('/', requestCreateStudent);
router.put('/:id', requestUpdateStudent);
router.delete('/:id', requestDeleteStudent);

export default router;
