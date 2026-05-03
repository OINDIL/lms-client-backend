"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react";

import { SignUpAction } from "@/actions/auth-action"
import { toast } from 'sonner';
import Link from "next/link"

export default function SignUpComponent() {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        age: '',
        name: ''
    })


    const handleLogin = async () => {
        const { success, message } = await SignUpAction(formData.name, formData.email, formData.password, formData.age);

        if (!success) return toast.error(message);

        toast.success(message)

        // TODO: redirection pending
    }
    return (
        <section className="flex min-h-screen justify-center items-center">
            <Card className="flex-1 max-w-md">
                <CardHeader>
                    <CardTitle>Create an account</CardTitle>
                    <CardDescription>Sign up with your preffered serivice</CardDescription>
                </CardHeader>

                <CardContent className="space-y-3">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>

                        <Input className="" placeholder="e.g. johndoe@example.com" onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>

                        <Input className="" placeholder="e.g. ********" onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Name</Label>

                        <Input className="" placeholder="John Doe" onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Age</Label>

                        <Input className="" placeholder="18" onChange={(e) => setFormData({ ...formData, age: e.target.value })} />
                    </div>
                </CardContent>

                <CardFooter className="flex flex-col gap-2">
                    <Button className="w-full" onClick={handleLogin}>Sign Up</Button>
                    <Link href={'/login'}>Already have an account?</Link>
                </CardFooter>
            </Card>
        </section>
    )
}