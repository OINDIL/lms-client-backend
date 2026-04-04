"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginComponent() {
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

                        <Input className="" placeholder="e.g. johndoe@example.com" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Enter your password</Label>

                        <Input className="" placeholder="e.g. ********" />
                    </div>
                </CardContent>

                <CardFooter>
                    <Button className="w-full">Login</Button>
                </CardFooter>
            </Card>
        </section>
    )
}