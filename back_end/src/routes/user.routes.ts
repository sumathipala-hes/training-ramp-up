import express from 'express';

import { validateStudent } from '../middleware/validateStudent';
import {
  requestCreateUser,
  requestDeleteUser,
  requestGetAllUsers,
  requestUpdateUser,
  requestUsersByOne,
} from '../controllers/user.controller';
import { validateUsers } from '../middleware/validateUsers';

const router = express.Router();

router.get('/', requestGetAllUsers);
router.get('/:search', requestUsersByOne);
router.post('/', validateUsers, requestCreateUser);
router.put('/:id', validateUsers, requestUpdateUser);
router.delete('/:id', requestDeleteUser);

export default router;
