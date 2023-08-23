import { Router } from "express";
import { login, logout, register, student } from "../controllers/auth.controller";
import { validateToken } from "../controllers/auth.controller";

const router = Router();

router.post('/login', login);

router.post('/register', register);

router.post('/logout', logout);

router.get('/student', validateToken, student);


export default router;
