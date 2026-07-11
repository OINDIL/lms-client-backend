import { Router } from "express";
import { LoginController, SignupController, VerifyUser } from "../controller/auth.controller.js";
import { AuthMiddleware } from "../middlewares/auth.middleware.js";

const router: Router = Router();


router.post('/login', LoginController);
router.post('/signup', SignupController);
router.post('/verify', VerifyUser);
router.get('/check-login', AuthMiddleware, (req, res) => { res.json({ success: true, message: "Authorized" }) })

export default router;
