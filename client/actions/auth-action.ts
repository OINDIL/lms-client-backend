'use server'
import { cookies } from "next/headers";
export async function LoginAction(email: string, password: string): Promise<{
  success: boolean,
  message: string
}> {

  const cookieStore = await cookies();
  const req = await fetch(`${process.env.BACKEND_URL}/api/login`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: "include",
    body: JSON.stringify({ email, password })
  });

  const data = await req.json();

  if (data.success && data.token) {
    cookieStore.set("token", data.token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/"
    });
  }

  return data;
}


export async function SignUpAction(name: string, email: string, password: string, age: string): Promise<{
  success: boolean,
  message: string
}> {
  const req = await fetch(`${process.env.BACKEND_URL}/api/signup`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password, name, age })
  });

  const data = await req.json();

  return data;

}


export async function VerifyOtpAction(email: string, otp: string): Promise<{
  success: boolean,
  message: string
}> {
  const req = await fetch(`${process.env.BACKEND_URL}/api/verify`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ otp, email })
  });

  const data = await req.json();

  return data;
}


export async function CheckLogin(): Promise<{ success: boolean, message: string, data?: { name: string } }> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const res = await fetch(`${process.env.BACKEND_URL}/api/check-login`, {
    method: "GET",
    headers: {
      "Cookie": `token=${token || ""}`
    },
    credentials: "include"
  })

  const data = await res.json()

  return data
}
