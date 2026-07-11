import { Router } from "express";
import { CheckLogin, LoginController, SignupController, VerifyUser } from "../controller/auth.controller.js";
import { AuthMiddleware } from "../middlewares/auth.middleware.js";

const router: Router = Router();


router.post('/login', LoginController);
router.post('/signup', SignupController);
router.post('/verify', VerifyUser);
router.get('/check-login', AuthMiddleware, CheckLogin)

export default router;
