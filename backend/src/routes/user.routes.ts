import express, { Router } from 'express';
import { addUsers, deleteUsers, retriveAllUsers, updateUsers } from '../controllers/user.controller';

const router: Router = express.Router();

router.get('/', retriveAllUsers);
router.post('/', addUsers);
router.put('/:id', updateUsers);
router.delete('/:id', deleteUsers);

export default router;
