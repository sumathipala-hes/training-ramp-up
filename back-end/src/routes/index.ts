import express from 'express';
import {initializeApp} from "../controllers/initializeApp"

const router = express.Router();
router.get('/', initializeApp);
export default router;