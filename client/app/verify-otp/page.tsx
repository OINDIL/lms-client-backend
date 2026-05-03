'use client';

import { VerifyOtpAction } from "@/actions/auth-action";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function VerifyOtp() {

    const [formData, setFormData] = useState({
        otp: ''
    });

    console.log(formData)


    const searchParams = useSearchParams()
    const router = useRouter();


    const handleVerifyOtp = async () => {
        const email = searchParams.get('email');

        if (!email) return toast.error("Email not found");

        const { success, message } = await VerifyOtpAction(email, formData.otp);

        if (!success) return toast.error(message);

        toast.success(message, {
            onAutoClose: () => router.push(`/dashboard`)
        })

        // TODO: redirection pending
    }

    return (
        <section className="flex min-h-screen justify-center items-center">
            <Card className="flex-1 max-w-md">
                <CardHeader>
                    <CardTitle>
                        OTP Verification
                    </CardTitle>
                    <CardDescription>
                        Enter the OTP that is sent to your registered email.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <InputOTP maxLength={6} onChange={(e) => setFormData({ otp: e })}>
                        <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                        </InputOTPGroup>
                    </InputOTP>
                </CardContent>
                <CardFooter>
                    <Button onClick={handleVerifyOtp}>Submit</Button>
                </CardFooter>
            </Card>
        </section>
    )
}