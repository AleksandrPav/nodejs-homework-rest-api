const register = require('./register')
const login = require('./login')
const current = require('./current')
const logout = require('./logout')
const updateAvatar = require('./updateAvatar')
const verify = require('./verify')
const repeatEmailVerify = require('./repeatEmailVerify')


module.exports = {
    register,
    login,
    current,
    logout,
    updateAvatar,
    verify,
    repeatEmailVerify
}