"use server"

import { cookies } from "next/headers";

export async function createCourseAction(name: string, desc: string): Promise<{
    success: boolean,
    message: string
}> {
    const cookieStore = await cookies();

    const token = cookieStore.get("token")?.value;
    const req = await fetch(`${process.env.BACKEND_URL}/api/course/create`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            "Cookie": `token=${token || ""}`
        },
        credentials: "include",
        body: JSON.stringify({ name, desc })
    });

    const data = await req.json();

    console.log(data)

    return data;
}