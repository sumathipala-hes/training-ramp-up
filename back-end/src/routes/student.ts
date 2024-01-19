import { Router } from 'express';
import { StudentController } from '../controllers/student';

const router = Router();

const studentController = new StudentController();

router.get('/', studentController.getStudents);

router.post('/', studentController.createStudent);

router.get('/:id', studentController.getStudentById);

router.put('/:id', studentController.updateStudent);

router.delete('/:id', studentController.deleteStudent);

export default router;
