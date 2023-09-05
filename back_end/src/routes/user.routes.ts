import express from 'express';

import {
  requestCreateUser,
  requestDeleteUser,
  requestGetAllUsers,
  requestUpdateUser,
  requestUsersByOne,
  signIn,
  signOut,
} from '../controllers/user.controller';
import { validateUsers } from '../middleware/validate.users.middleware';
import {
  authPermissions,
  authorizationPermissions,
} from '../middleware/jwt.middleware';

const router = express.Router();

router.get('/', requestGetAllUsers);
router.get('/:search', requestUsersByOne);
router.post('/', authPermissions, validateUsers, requestCreateUser);
router.put('/:id', authPermissions, validateUsers, requestUpdateUser);
router.delete('/:id', authPermissions, requestDeleteUser);

router.post('/signIn', signIn);
router.delete('/signOut', authorizationPermissions, signOut);

export default router;
