import { Router } from "express";
import StudentRoutes from "./student.routes";
import UserRoutes from "./user.routes";

const router: Router = Router();
const url_prefix = "/api/v1";

router.use(`${url_prefix}/student`, new StudentRoutes().getRouter());
router.use(`${url_prefix}/user`, new UserRoutes().getRouter());

export default router;
