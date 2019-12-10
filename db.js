const mongoose = require('mongoose')


mongoose.connect(
    'mongodb://user:perfectpassword1998@ds042898.mlab.com:42898/gridncloud',  { 
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

module.exports = connection