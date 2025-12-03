import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import e from 'cors';
dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const sendMail = async (to, subject, text) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        text,
    };
    try {
        return await transporter.sendMail(mailOptions);
    } catch (error) {
        console.log(error);
    }
}

// sendMail(process.env.EMAIL_USER, "Test Email", "This is a test email from Node.js")
//     .then(() => {
//         console.log("Email sent successfully");
//     })
//     .catch((error) => {
//         console.error("Error sending email:", error);
//     });

export default sendMail;