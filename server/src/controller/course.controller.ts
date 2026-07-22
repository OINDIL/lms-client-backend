import { Request, Response } from 'express';
import { prisma } from '../utils/prisma.js'



export async function createCourse(req: Request<{}, {}, { name: string, desc: string }>, res: Response) {
    try {
        const userId = req.user;
        const { name, desc } = req.body;


        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            })
        }

        if (!name.trim() || !desc.trim()) {
            return res.status(400).json({
                success: false,
                message: "Name and Description can not be empty"
            })
        }

        const createdCourse = await prisma.courses.create({
            data: {
                name,
                desc,
                usersId: userId as string
            }
        })

        if (!createdCourse) {
            return res.status(400).json({
                success: false,
                message: "Can not create course right now, Please try again later"
            })
        }


        res.status(201).json({
            success: true,
            message: "Course created successfully",
        })


    } catch {
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }

}