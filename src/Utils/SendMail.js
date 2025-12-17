import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();


const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.PASS_MAIL,
    pass: process.env.PASS_KEY
  }
});

const sendMail = async (to, subject, text) => {
  try {
    await transporter.sendMail({
      from: process.env.PASS_MAIL,
      to,
      subject,
      text
    });

    console.log("MAIL SENT TO:", to);
  } catch (error) {
    console.error("MAIL ERROR:", error);
  }
};

export default sendMail;











// import { Resend } from "resend";

// const resend = new Resend(process.env.RESEND_API_KEY);

// const sendMail = async (to, subject, text) => {
//   const mailOptions = {
//     // from: "onboarding@resend.dev", // must be verified in Resend
//     from: "svpparameshkumar2004@gmail.com", // must be verified in Resend
//     to,
//     subject,
//     text
//   };

//   try {
//     return await resend.emails.send(mailOptions)
//       .then(() => console.log("MAIL SENT"))
//       .catch(err => console.log("MAIL ERROR:", err));
//   } catch (error) {
//     console.log(error);
//   }
// };

// export default sendMail;