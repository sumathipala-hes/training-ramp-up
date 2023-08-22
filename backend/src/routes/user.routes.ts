import express, { Router } from 'express';
import {
  addUsers,
  deleteUsers,
  login,
  retriveAllUsers,
  updateUsers,
} from '../controllers/user.controller';
import { authenticateToken } from '../middleware/jwt.middleware';

const router: Router = express.Router();

router.get('/', authenticateToken, retriveAllUsers);
router.get('/login', authenticateToken, login);
router.post('/', addUsers);
router.put('/:id', updateUsers);
router.delete('/:id', deleteUsers);

export default router;
