import { Request, Response } from "express"
import { prisma } from "../utils/prisma.js";
import bcrypt from 'bcrypt';
import { generateOTP, SendEmail } from "../utils/helpers.js";
import { ResponseWithSuccessAndMessage } from "../types/response.js";
import jwt from 'jsonwebtoken';


const secret = process.env.JWT_SECRET;


export async function LoginController(req: Request<{}, {}, { email: string, password: string }>, res: Response<ResponseWithSuccessAndMessage>) {
  try {

    const { email, password } = req.body;

    if (!email.trim() || !password.trim()) {
      return res.status(400).json({
        success: false,
        message: "Invalid Email or Password"
      })
    }

    const userExists = await prisma.users.findFirst({
      where: {
        email: email,
      },
      select: {
        password: true,
        id: true
      }
    })

    if (!userExists) {
      return res.status(400).json({
        success: false,
        message: "No user found, please signup"
      })
    }


    const passwordMatched = await bcrypt.compare(password, userExists.password);


    if (!passwordMatched) {
      return res.status(400).json({
        success: false,
        message: "Wrong password, Please try again"
      })
    }


    const generatedToken = jwt.sign(userExists.id, secret as string);


    res.cookie('token', generatedToken, { httpOnly: false, secure: false }).json({
      success: true,
      message: "Login Successfull, Welcome!",
      token: generatedToken
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error"
    })
  }
}

export async function SignupController(req: Request<{}, {}, {
  name: string,
  email: string,
  password: string,
  age: string,
  role: "ADMIN" | "STUDENT"
}>, res: Response<ResponseWithSuccessAndMessage>) {
  try {
    const { name, email, password, role, age } = req.body;

    console.log({ name, email, password, role, age });

    if (!name.trim() || !email.trim() || !password.trim()) {
      return res.status(400).json({
        success: false,
        message: "Can not sign up now, Please try again later"
      })
    }

    const existingUser = await prisma.users.findFirst({
      where: {
        email
      }
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists, please sign in!"
      })
    }

    const genSalt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, genSalt);

    const generatedOtp = generateOTP(6);

    // send mail to user email


    // const mailSent = await SendEmail(email, 'OTP for verification', `Login to your LMS with this otp ${generatedOtp}`, `<h1>Login to your LMS with this OTP ${generatedOtp}</h1>`);


    // if (!mailSent) {
    //     return res.status(400).json({
    //         success: false,
    //         message: "Unable to complete request, Please try again later."
    //     })
    // }

    const createdUser = await prisma.users.create({
      data: {
        email,
        password: passwordHash,
        age,
        role,
        otp: generatedOtp,
        name
      }
    })

    if (!createdUser) {
      return res.status(400).json({
        success: false,
        message: "Failed to create user, Please try again later"
      })
    }

    res.json({
      success: true,
      message: "Signed up, Redirecting..."
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error"
    })
  }
}


export async function VerifyUser(req: Request<{}, {}, {
  otp: string,
  email: string
}>, res: Response<ResponseWithSuccessAndMessage>) {
  try {
    const { otp, email } = req.body;
    console.log(otp)

    if (!otp.trim() || !email.trim()) {
      return res.status(400).json({
        success: false,
        message: "No OTP found."
      })
    }

    const foundUser = await prisma.users.findFirst({
      where: {
        email
      }
    })

    if (!foundUser) {
      return res.status(400).json({
        success: false,
        message: "No User found."
      })
    }

    if (foundUser.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Incorrect OTP. Please try again."
      })
    }


    await prisma.users.update({
      where: {
        email
      },
      data: {
        verifiedEmail: true,
        otp: ''
      }
    })

    res.json({
      success: true,
      message: "Verified User. Redirecting..."
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error"
    })
  }
}


export async function CheckLogin(req: Request, res: Response) {
  try {
    const userId = req.user;

    if (!userId) return res.status(400).json({
      success: false,
      message: "User not found"
    })
    // return name
    const authUser = await prisma.users.findUnique({
      where: {
        id: userId as string,
      },
      select: {
        name: true,
        role: true,
      }
    })
    // console.log(name)
    if (!authUser) return res.status(400).json({
      success: false,
      message: "User not found"
    });


    res.json({
      success: true,
      message: "User is authenticated",
      data: authUser
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error"
    })
  }
}
