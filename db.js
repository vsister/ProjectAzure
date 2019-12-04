const mongoose = require('mongoose')


mongoose.connect(
    'mongodb://user:pass123@ds018839.mlab.com:18839/gridncloud',  { 
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
      }
)

const connection = mongoose.connection

connection.on('error', function(){
    console.log('Connect error')
})

connection.once('open', async function(){
    console.log('MongoDB successfully connected')
})


const userSchema = mongoose.Schema({
    githubId: String,
})

const User = connection.model('User', userSchema)

module.exports = User