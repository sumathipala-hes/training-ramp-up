import express from 'express';
import studentRoutes from './studentRoutes';

const router = express.Router();

router.use('/students', studentRoutes);

export default router;
