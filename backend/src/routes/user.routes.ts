import express, { Router } from 'express';
import {
  addUsers,
  deleteUsers,
  signIn,
  retriveAllUsers,
  updateUsers,
  generateNewAccessToken,
  signOut,
} from '../controllers/user.controller';
import { authorization } from '../middleware/jwt.middleware';

const router: Router = express.Router();

router.get('/',retriveAllUsers);
router.post('/signIn', signIn);
router.post('/', addUsers);
router.post('/new', generateNewAccessToken);
router.post('/detail', authorization, signIn);
router.put('/:email', updateUsers);
router.delete('/:id', deleteUsers);
router.delete('/signOut', authorization, signOut);

export default router;
