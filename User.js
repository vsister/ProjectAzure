const mongoose = require('mongoose')
const connection = require('./db')

const userSchema = mongoose.Schema({
    githubId: String,
    translations: [String]
})

const User = connection.model('User', userSchema)

module.exports = User