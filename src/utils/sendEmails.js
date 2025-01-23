const nodemailer = require('nodemailer')

const sendEmails = async (options)=>{

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: true, // true for port 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});
const mailOptions = {
    from: '"OVI store" <maddison53@ethereal.email>',
    to: options.email,
    subject: options.subject,
    text: options.message,
    }
    await transporter.sendMail(mailOptions)
}
module.exports = sendEmails