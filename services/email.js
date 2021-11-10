import nodemailer from "nodemailer";

const createTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail",
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.GOOGLE_EMAIL,
      pass: process.env.GOOGLE_APP_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
}

export const sendVerifyPasswordChange = async (email, link) => {
  const transporter = createTransporter()

  const options = {
    from: '<dooba.com>',
    to: email,
    subject: "Confirm password change",
    text: `click on the link to change your password - ${link}`,
  };

  await transporter.sendMail(options);
}

export const sendInviteToProject = async (email, link) => {
  const transporter = createTransporter()

  const options = {
    from: '<dooba.com>',
    to: email,
    subject: "You have been invited to dooba project",
    text: `click on the link to register - ${link}`,
  };

  await transporter.sendMail(options);
}