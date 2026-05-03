'use server'

export async function LoginAction(email: string, password: string): Promise<{
    success: boolean,
    message: string
}> {
    const req = await fetch(`${process.env.BACKEND_URL}/api/login`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });

    const data = await req.json();

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