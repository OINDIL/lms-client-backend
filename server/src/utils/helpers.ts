import nodemailer from 'nodemailer';


export function generateOTP(length: number = 6): string {
    const digits = '0123456789';
    let otp = '';
    for (let i = 0; i < length; i++) {
        otp += digits[Math.floor(Math.random() * digits.length)];
    }
    return otp;
}


export async function SendEmail(to: string, subject: string, text: string, html: string) {
    // Create a transporter using Ethereal test credentials.
    // For production, replace with your actual SMTP server details.
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // Use true for port 465, false for port 587
        auth: {
            user: process.env.SMTP_EMAIL,
            pass: process.env.SMTP_PASS,
        },
    });

    // Send an email using async/await

    const info = await transporter.sendMail({
        from: process.env.SMTP_EMAIL,
        to,
        subject,
        text, // Plain-text version of the message
        html, // HTML version of the message
    });


    if (!info) return false;

    return true
}