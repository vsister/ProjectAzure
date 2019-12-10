const mongoose = require('mongoose')
const connection = require('./db')

const translationSchema = mongoose.Schema({
    original: String,
    translated: String
})

const Translation = connection.model('Translation ', translationSchema)

module.exports = Translation