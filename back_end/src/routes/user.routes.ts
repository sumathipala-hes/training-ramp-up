import express from 'express';

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
import { authorizationPermissions } from '../middleware/jwt.middleware';

const router = express.Router();

router.get('/', requestGetAllUsers);
router.get('/:search', requestUsersByOne);
router.post('/', validateUsers, requestCreateUser);
router.put('/:id', validateUsers, requestUpdateUser);
router.delete('/:id', requestDeleteUser);

router.post('/signIn', signIn);
router.post('/new', generateNewAccessToken);
router.post('/detail', authorizationPermissions, signIn);
router.delete('/signOut', authorizationPermissions, signOut);

export default router;
