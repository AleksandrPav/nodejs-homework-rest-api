const nodemailer = require('nodemailer');

const { META_PASSWORD } = process.env;

const nodemailerConfig = {
  host: 'smtp.meta.ua',
  port: 465,
  secure: true,
  auth: {
    user: 'oleksandr_pavlov_88@meta.ua',
    pass: META_PASSWORD,
  },
}

const transporter = nodemailer.createTransport(nodemailerConfig);
/*
const data = {
  to: 'alekspavlov30088@gmail.com',
  subject: 'Sending with Twilio SendGrid is Fun',
  html: 'and easy to do anywhere, even with Node.js',
}
*/
const sendEmail = async (data) => {
    const mail = { ...data, from: 'oleksandr_pavlov_88@meta.ua', };
    return await transporter.sendMail(mail);
    return true;
}

  
module.exports = sendEmail;