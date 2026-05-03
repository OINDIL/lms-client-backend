"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react";

import { LoginAction } from "@/actions/auth-action"
import { toast } from 'sonner';
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function LoginComponent() {

    const router = useRouter()
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })


    const handleLogin = async () => {
        const { success, message } = await LoginAction(formData.email, formData.password);

        if (!success) return toast.error(message);

        toast.success(message, {
            onAutoClose: () => router.push('/dashboard')
        })
    }
    return (
        <section className="flex min-h-screen justify-center items-center">
            <Card className="flex-1 max-w-md">
                <CardHeader>
                    <CardTitle>Login to continue</CardTitle>
                    <CardDescription>Login with your preffered serivice</CardDescription>
                </CardHeader>

                <CardContent className="space-y-3">
                    <div className="space-y-2">
                        <Label htmlFor="email">Enter your email</Label>

                        <Input className="" placeholder="e.g. johndoe@example.com" onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Enter your password</Label>

                        <Input className="" placeholder="e.g. ********" onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                    </div>
                </CardContent>

                <CardFooter className="flex flex-col gap-2">
                    <Button className="w-full" onClick={handleLogin}>Login</Button>
                    <Link href={'/sign-up'}>Don&apos;t have an account?</Link>
                </CardFooter>
            </Card>
        </section>
    )
}