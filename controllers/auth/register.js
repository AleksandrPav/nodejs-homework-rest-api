const bcrypt = require('bcryptjs')
const gravatar = require('gravatar')
const {v4 : uuidv4} = require('uuid')



const { User } = require('../../models/user')
const { RequestError } = require('../../helpers/Errors')
const { sendEmail, createEmailVerify } = require('../../helpers/EmailSend')


const register = async (req, res, next) => {
    try {
        const { email, password, name, subscription } = req.body;
        const result = await User.findOne({ email })
        if (result) {
            throw RequestError('Email in use', 409)
        }
        const hashPassword = await bcrypt.hash(password, 10)

        const avatarURL = gravatar.url(email)
        
        const verificationToken = uuidv4()

        const newUser = new User({ email, password:hashPassword, name, subscription, avatarURL, verificationToken })
        await newUser.save()

        const mail = await createEmailVerify(email, verificationToken)

        await sendEmail(mail)

        res.status(201).json({
            user: {
                email: newUser.email,
                subscription: newUser.subscription
            }
        })
    }
    catch (error) {
        next(error)
    }
}

module.exports = register;