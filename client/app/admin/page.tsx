"use client"

import { Button, buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/hooks/useAuth"
import { Loader2 } from "lucide-react"
import Link from "next/link"
import { createCourseAction } from "@/actions/course-action"
import { useState } from "react"

export default function AdminDashboard() {
    const { authenticated, loading } = useAuth();
    const [courseData, setCourseData] = useState({
        name: "",
        desc: ""
    })

    if (loading) {
        return (
            <section className="max-w-6xl mx-auto px-8 py-4 min-h-screen flex items-center justify-center">
                <Loader2 className="animate-spin" />
            </section>
        )
    }

    if (!loading && !authenticated.status) return (
        <section className="max-w-6xl mx-auto px-8 py-4 min-h-screen text-red-300">User not authenticated</section>
    )

    if (!authenticated.isAdmin) {
        return (
            <section className="space-y-2 max-w-6xl mx-auto px-8 py-4 min-h-screen text-red-300">
                <p> You do not have enough permissions to view this page</p>
                <Link href={'/login'} className={buttonVariants()}>Go Back</Link>
            </section>
        )
    }



    return (
        <section className="max-w-6xl mx-auto px-8 py-5">
            <div>
                <h1 className="text-xl font-semibold">
                    Admin Dashboard
                </h1>
                <p className="text-sm text-zinc-500">Manage your content</p>
            </div>

            <div className="mt-5">
                <Card>
                    <CardHeader>
                        <CardTitle>Create Course</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="space-y-2">
                            <Label htmlFor="course-name">Course Name</Label>
                            <Input name="course-name" id="course-name" placeholder="Name your class in short" onChange={(e) => {
                                setCourseData({ ...courseData, name: e.target.value })
                            }} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="course-desc">Course Description</Label>
                            <Input name="course-desc" id="course-desc" placeholder="Give your class a short description"
                                onChange={(e) => {
                                    setCourseData({ ...courseData, desc: e.target.value })
                                }}
                            />
                        </div>

                        <Button onClick={() => createCourseAction(courseData.name, courseData.desc)}>Create Course</Button>
                    </CardContent>
                </Card>
                <Separator className="my-4" />

                <Card>
                    <CardHeader>
                        <CardTitle>Create lesson and upload video</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div>
                            <DropdownMenu>
                                <DropdownMenuTrigger className={buttonVariants({ variant: "secondary" })}>
                                    Select Course
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    {/* <DropdownMenuGroup>
                                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                        <DropdownMenuItem>Profile</DropdownMenuItem>
                                        <DropdownMenuItem>Billing</DropdownMenuItem>
                                    </DropdownMenuGroup>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuGroup>
                                        <DropdownMenuItem>Team</DropdownMenuItem>
                                        <DropdownMenuItem>Subscription</DropdownMenuItem>
                                    </DropdownMenuGroup> */}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="lesson-name">Lesson Name</Label>
                            <Input name="lesson-name" id="lesson-name" placeholder="Name your lesson in short" />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="lesson-desc">lesson Description</Label>
                            <Input name="lesson-desc" id="lesson-desc" placeholder="Give your lesson a short description" />
                        </div>
                        <div className="space-y-2">

                            <Label>Select Video file</Label>
                            <Input type="file" accept="" />

                        </div>
                        <Button>Create lesson</Button>
                    </CardContent>
                </Card>
            </div>
        </section>
    )
}