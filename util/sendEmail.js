import { createTransport } from "nodemailer"
import dotenv from "dotenv"
dotenv.config()

/**
 *  Sends an email
 * @param {string} email - The email to send to
 * @param {string} subject - The subject of the email
 * @param {string} text - Email content
 */
const sendEmail = async (email, subject, text) => {
  try {
    const transporter = createTransport({
      host: process.env.EMAIL_HOST,
      service: process.env.EMAIL_SERVICE,
      port: 587,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    })

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: subject,
      text: text
    })

    console.log("email sent successfully")
  } catch (error) {
    console.log(error, "email not sent")
    throw error
  }
}

export default sendEmail
