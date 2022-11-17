const { User } = require('../../models/user')
const { RequestError } = require('../../helpers/Errors')
const { createEmailVerify } = require('../../helpers/EmailSend')

const repeatEmailVerify = async (req, res, next) => {
    try {
        const { email } = req.body
        const user = await User.findOne({ email })
        if (!user) {
            throw RequestError('User not found', 404)
        }
        if (user.verify) {
            throw RequestError('Verification has already been passed', 400)
        }
        const mail = await createEmailVerify(email, user.verificationToken)
        await sendEmail(mail)

        res.status(200).json({
            message: 'Verification email send'
        })
        
    }
    catch (error) {
        next(error)
    }
}

module.exports = repeatEmailVerify;