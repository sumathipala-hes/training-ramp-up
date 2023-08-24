import { Router } from "express";
import { login, logout, register, userAuthenticated } from "../controllers/auth.controller";
import { verifyJWT } from "../controllers/auth.controller";

const router = Router();

router.post('/register', register);

router.post('/login', login);

router.post('/logout', logout);

router.get('/userAuth', verifyJWT, userAuthenticated);


export default router;
