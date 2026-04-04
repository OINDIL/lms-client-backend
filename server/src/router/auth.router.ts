import { Router } from "express";
import { LoginController, SignupController, VerifyUser } from "../controller/auth.controller.js";

const router: Router = Router();


router.post('/login', LoginController);
router.post('/signup', SignupController);
router.post('/verify', VerifyUser);

export default router;