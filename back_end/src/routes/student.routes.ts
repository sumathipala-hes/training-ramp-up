import express from 'express';
import {
  requestCreateStudent,
  requestDeleteStudent,
  requestGetAllStudents,
  requestStudentsByOne,
  requestUpdateStudent,
} from '../controllers/student.controller';
import { validateStudent } from '../middleware/validate.student.middleware';
import { authPermissions } from '../middleware/jwt.middleware';

const router = express.Router();

router.get('/', requestGetAllStudents);
router.get('/:search', requestStudentsByOne);
router.post('/', authPermissions, validateStudent, requestCreateStudent);
router.put('/:id', authPermissions, validateStudent, requestUpdateStudent);
router.delete('/:id', authPermissions, requestDeleteStudent);

export default router;
