import { Router } from "express";
import { createCourse } from "../controller/course.controller.js";
import { AdminMiddleware } from "../middlewares/auth.middleware.js";


const router: Router = Router();



router.post('/create', AdminMiddleware, createCourse);
router.get('/get-course', () => { })


export default router;