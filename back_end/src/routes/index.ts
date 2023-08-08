import { Router } from "express";
import StudentRoutes from "./student.routes";

const router: Router = Router();
const url_prefix = "/api/v1";

router.use(`${url_prefix}/student`, new StudentRoutes().getRouter());

export default router;
