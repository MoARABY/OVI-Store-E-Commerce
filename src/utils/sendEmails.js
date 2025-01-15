const nodemailer = require("nodemailer");
const apiError = require('../utils/apiError')

const sendEmails = async (options)=>{

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    //   port changed depend on secure 578/465
    port: process.env.EMAIL_PORT,
    secure: true, // true for port 465, false for other ports
    auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
},
});
    const mailOptions = {
        from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>',
        to: options.email, // list of receivers
        subject: options.subject, // Subject line
        text: options.message, // plain text body
        }
    await transporter.sendMail(mailOptions)
}

module.exports = sendEmails