import { Router } from "express";
import { getUserRole, login, logout, register, userAuthenticated } from "../controllers/user.controller";
import { verifyJWT, verifyRefreshJWT } from "../middlewares/UserValidations";
import { registrationValidation, validate } from "../middlewares/UserValidations";

const router = Router();

router.post('/register', registrationValidation, validate, register);

router.post('/login', login);

router.post('/logout', logout);

router.get('/userAuth', verifyJWT, userAuthenticated);

router.get('/user', verifyJWT, getUserRole);

router.get('/refresh', verifyRefreshJWT, userAuthenticated);

export default router;
