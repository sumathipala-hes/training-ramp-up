import express, { Router } from 'express';
import {
  addUsers,
  deleteUsers,
  signIn,
  retriveAllUsers,
  updateUsers,
  signOut,
} from '../controllers/user.controller';
import { authorization } from '../middleware/jwt.middleware';

const router: Router = express.Router();

router.get('/', retriveAllUsers);
router.post('/signIn', signIn);
router.post('/add', addUsers);
router.put('/:email', updateUsers);
router.delete('/del/:id', deleteUsers);
router.delete('/signOut', authorization, signOut);

export default router;
