import { Router } from "express";
import { login, logout, register, userAuthenticated } from "../controllers/user.controller";
import { verifyJWT } from "../middlewares/UserValidations";
import { registrationValidation, validate } from "../middlewares/UserValidations";

const router = Router();

router.post('/register', registrationValidation, validate, register);

router.post('/login', login);

router.post('/logout', logout);

router.get('/userAuth', verifyJWT, userAuthenticated);

export default router;
