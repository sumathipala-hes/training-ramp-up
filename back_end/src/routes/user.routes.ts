import express from 'express';

import { validateStudent } from '../middleware/validate.student.middleware';
import {
  generateNewAccessToken,
  requestCreateUser,
  requestDeleteUser,
  requestGetAllUsers,
  requestUpdateUser,
  requestUsersByOne,
  signIn,
  signOut,
} from '../controllers/user.controller';
import { validateUsers } from '../middleware/validate.users.middleware';
import { authorization } from '../middleware/jwt.middleware';

const router = express.Router();

router.get('/', requestGetAllUsers);
router.get('/:search', requestUsersByOne);
router.post('/', validateUsers, requestCreateUser);
router.put('/:id', validateUsers, requestUpdateUser);
router.delete('/:id', requestDeleteUser);

router.post('/signIn', signIn);
router.post('/new', generateNewAccessToken);
router.post('/detail', authorization, signIn);
router.delete('/signOut', authorization, signOut);

export default router;
