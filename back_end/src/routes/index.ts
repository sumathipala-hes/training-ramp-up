import express from 'express';
import studentRoutes from './student.routes';
import userRoutes from './user.routes';

const router = express.Router();

router.use('/students', studentRoutes);
router.use('/users', userRoutes);

export default router;
