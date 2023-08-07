import express from 'express';
import studentRoutes from './student.routes';

const router = express.Router();

router.use('/students', studentRoutes);

export default router;
