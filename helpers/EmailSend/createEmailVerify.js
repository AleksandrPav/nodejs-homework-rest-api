const { BASE_URL } = process.env;

const createEmailVerify = async (email, verificationToken) => {
    const mail = {
        to: email,
        subject: 'Email verification',
        html: `
            <a href="${BASE_URL}/api/auth/verify/${verificationToken}">Verify email</a>
        `
    };
    return mail;
};

module.exports = createEmailVerify;