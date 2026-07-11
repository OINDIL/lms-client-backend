import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"

const secret = process.env.JWT_SECRET;

export async function AuthMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    // cookie
    // console.log(req)
    const cookies = req.cookies;
    if (!cookies.token) return res.status(400).json({
      success: false, message:
        "Unauthorized"
    })

    if (!secret) return res.status(400).json({
      success: false,
      message: "Unauthrized"
    })


    const verifiedToken = jwt.verify(cookies.token, secret);

    if (!verifiedToken) return res.status(400).json({
      success: false,
      message: "Unauthorized"
    })

    req.user = verifiedToken;

    next()
  }
  catch (error: unknown) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" })
  }
}
