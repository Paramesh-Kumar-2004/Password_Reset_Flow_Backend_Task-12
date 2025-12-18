
// // Nodemailer
// import nodemailer from 'nodemailer';
// import dotenv from 'dotenv';
// dotenv.config();


// const transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   port: 587,
//   secure: false,
//   auth: {
//     user: process.env.FROM_EMAIL,
//     pass: process.env.PASS_KEY
//   }
// });

// const sendMail = async (to, subject, text) => {
//   try {
//     await transporter.sendMail({
//       from: process.env.FROM_EMAIL,
//       to,
//       subject,
//       text
//     });

//     console.log("MAIL SENT TO:", to);
//   } catch (error) {
//     console.error("MAIL ERROR:", error);
//   }
// };

// export default sendMail;









// // Resend

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




// Brevo
import SibApiV3Sdk from "sib-api-v3-sdk";
import dotenv from "dotenv";
dotenv.config();

const client = SibApiV3Sdk.ApiClient.instance;
const apiKey = client.authentications["api-key"];
apiKey.apiKey = process.env.BREVO_API_KEY;

const transactionalEmailApi = new SibApiV3Sdk.TransactionalEmailsApi();

const sendMail = async (to, subject, text) => {
  try {
    await transactionalEmailApi.sendTransacEmail({
      sender: {
        email: process.env.FROM_EMAIL,
        name: process.env.FROM_NAME
      },
      to: [{ email: to }],
      subject,
      textContent: text
    });

    console.log("MAIL SENT TO Using Brevo :", to);
  } catch (error) {
    console.error("MAIL ERROR:", error);
  }
};

export default sendMail;
