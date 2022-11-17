const { User } = require('../../models/user')
const { RequestError } = require('../../helpers/Errors')

const verify = async (req, res, next) => {
    try {
        const { verificationToken } = req.params
        const user = await User.findOne({
            verificationToken
        })
        if (!user) {
            throw RequestError('User not found', 404)
        }
        await User.findByIdAndUpdate
            (user._id, { verify: true, verificationToken: null })
        res.status(200).json({
            message: 'Verification successful'
        })
    }
    catch (error) {
        next(error)
    }
}

module.exports = verify;