import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

type Data = {
    message: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    if (req.method === "POST") {
        const {
            name,
            email,
            message,
        }: { name: string; email: string; message: string } = req.body;

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USERNAME, // Your email id
                pass: process.env.EMAIL_PASSWORD // Your password
            }
        });

        const mailOptions = {
            from: process.env.MAIL_FROM, // This will still be your Gmail address
            replyTo: email, // The sender's email address from the form
            to: process.env.MAIL_TO,
            subject: `${name.toUpperCase()} sent you a message from Portfolio`,
            text: `From: ${email}\n\n${message}`,
            html: `<p><strong>From:</strong> ${email}</p><p>${message.replace(/\r\n/g, "<br>")}</p>`
        };
        

        transporter.verify(function(error, success) {
            if (error) {
                console.log(error);
            } else {
                console.log("Server is ready to take our messages");
            }
        });

        
        try {
            await transporter.sendMail(mailOptions);
            res.status(200).json({ message: "Your message was sent successfully." });
        } catch (err) {
            res.status(500).json({ message: `There was an error sending your message. ${err}` });
        }
    } else {
        // Handle any non-POST requests
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
