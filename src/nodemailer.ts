import nodemailer from "nodemailer";

export const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "6742dafe69d1ae",
    pass: "abff72abaa4d71"
  }
});