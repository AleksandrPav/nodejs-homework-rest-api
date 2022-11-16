const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const multer  = require('multer')
const dotenv = require('dotenv');
dotenv.config();

const sgMail = require('@sendgrid/mail');
const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const mail = {
  to: 'alekspavlov30088@gmail.com',
  from: 'pavlovaleksandr@ukr.net',
  subject: 'Sending with Twilio SendGrid is Fun',
  html: 'and easy to do anywhere, even with Node.js',
}

sgMail.send(mail)
  .then(() => console.log('Email send successfully'))
  .catch((error) => console.log(error.message));





const multerConfig = multer.diskStorage({
})





const contactsRouter = require('./routes/api/contacts')
const authRouter = require('./routes/api/auth')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())
app.use(express.static('public'))


app.use('/api/contacts', contactsRouter)
app.use('/api/users', authRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err
  res.status(status).json({ status, message })
})

module.exports = app
