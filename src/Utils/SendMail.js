import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();



export const sendMail = async (to, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    tls: {
      rejectUnauthorized: false
    },
    port: 465,
    secure: false,
    auth: {
      user: process.env.FROM_EMAIL,
      pass: process.env.PASS_KEY
    }
  });

  const mailData = {
    from: process.env.FROM_EMAIL,
    to,
    subject,
    text,
  };
  await new Promise((resolve, reject) => {
    transporter.sendMail(mailData, (err, info) => {
      if (err) {
        reject(err);
      } else {
        console.log("Mail Send Successfully")
        resolve(info);
      }
    });
  });
};













// // Set SendGrid API key
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// /**
//  * Send email using SendGrid API
//  * @param {string} to - recipient email
//  * @param {string} subject - mail subject
//  * @param {string} text - mail content
//  */
// export const sendMail = async (to, subject, text) => {
//   try {
//     await sgMail.send({
//       to,
//       from: {
//         email: process.env.FROM_EMAIL,
//         name: process.env.FROM_NAME
//       },
//       subject,
//       text,
//       html: `<p>${text}</p>`
//     });

//     console.log("MAIL SENT USING SENDGRID TO:", to);
//   } catch (error) {
//     console.error(
//       "MAIL ERROR:",
//       error.response?.body || error.message
//     );
//   }
// };




// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// export const sendMail = async (to, subject, text) => {
//   try {
//     await sgMail.send({
//       to,
//       from: {
//         email: process.env.FROM_EMAIL,
//         name: process.env.FROM_NAME
//       },
//       subject,
//       text
//     });

//     console.log("MAIL SENT USING SENDGRID TO :", to);
//   } catch (error) {
//     console.error("MAIL ERROR :", error);
//   }
// };

// export default sendMail;








// export const sendMail = async (to, subject, text) => {
//   const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     host: 'smtp.gmail.com',
//     tls: {
//       rejectUnauthorized: false
//    },
//     port: 465,
//     secure: false,
//     auth: {
//       user: process.env.FROM_EMAIL,
//       pass: process.env.PASS_KEY
//     }
//   });

//   const mailData = {
//     from: process.env.FROM_EMAIL,
//     to,
//     subject,
//     text,
//   };
//   await new Promise((resolve, reject) => {
//     transporter.sendMail(mailData, (err, info) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(info);
//       }
//     });
//   });
// };



// // Nodemailer
// import nodemailer from 'nodemailer';
// import dotenv from 'dotenv';
// dotenv.config();


// // const transporter = nodemailer.createTransport({
// //   port: 465,
// //   host: "smtp.gmail.com",
// //   auth: {
// //     user: process.env.FROM_EMAIL,
// //     pass: process.env.PASS_KEY
// //   },
// //   secure: true,
// // });


// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     host: 'smtp.gmail.com',
//     tls: {
//         ciphers: "SSLv3",
//     },
//     port: 587,
//     secure: false,
//     auth: {
//         user: process.env.MAIL_SENDER,
//         pass: process.env.MAIL_PASS
//     }
// });

// const mailData = {
//   from: process.env.FROM_EMAIL,
//   to: process.env.FROM_EMAIL,
//   subject: `Message From ${email}`,
//   text: message,
// };

// const sendMail = async (to, subject, text) => {
//   await new Promise((resolve, reject) => {
//     transporter.sendMail(mailData, (err, info) => {
//       if (err) {
//         console.error(err);
//         reject(err);
//       } else {
//         resolve(info);
//       }
//     });
//   });
//   // try {

//   //   await transporter.sendMail({
//   //     from: process.env.FROM_EMAIL,
//   //     to,
//   //     subject,
//   //     text
//   //   });

//   //   console.log("MAIL SENT TO:", to);
//   // } catch (error) {
//   //   console.error("MAIL ERROR:", error);
//   // }
// };

// export default sendMail;









// // // Resend

// // import { Resend } from "resend";

// // const resend = new Resend(process.env.RESEND_API_KEY);

// // const sendMail = async (to, subject, text) => {
// //   const mailOptions = {
// //     // from: "onboarding@resend.dev", // must be verified in Resend
// //     from: "svpparameshkumar2004@gmail.com", // must be verified in Resend
// //     to,
// //     subject,
// //     text
// //   };

// //   try {
// //     return await resend.emails.send(mailOptions)
// //       .then(() => console.log("MAIL SENT"))
// //       .catch(err => console.log("MAIL ERROR:", err));
// //   } catch (error) {
// //     console.log(error);
// //   }
// // };

// // export default sendMail;




// // Brevo
// // import SibApiV3Sdk from "sib-api-v3-sdk";
// // import dotenv from "dotenv";
// // dotenv.config();

// // const client = SibApiV3Sdk.ApiClient.instance;
// // const apiKey = client.authentications["api-key"];
// // apiKey.apiKey = process.env.BREVO_API_KEY;

// // const transactionalEmailApi = new SibApiV3Sdk.TransactionalEmailsApi();

// // const sendMail = async (to, subject, text) => {
// //   try {
// //     await transactionalEmailApi.sendTransacEmail({
// //       sender: {
// //         email: process.env.FROM_EMAIL,
// //         name: process.env.FROM_NAME
// //       },
// //       to: [{ email: to }],
// //       subject,
// //       textContent: text
// //     });

// //     console.log("MAIL SENT TO Using Brevo :", to);
// //   } catch (error) {
// //     console.error("MAIL ERROR:", error);
// //   }
// // };

// // export default sendMail;
