const express = require("express")
const path = require('path')
const publicPath = path.join(__dirname, '/public')

const port = process.env.PORT || 80

const app = express()
app.set("view engine", "ejs")

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(publicPath))

let counter = 0

app.get('/', (req,res)=>{
    res.render('index', {Counter: counter})
})

app.post('/inc',(req,res)=>{
    ++counter
    res.redirect('/')
})
app.post('/clear',(req,res)=>{
    counter = 0
    res.redirect('/')
})

app.listen(port, ()=>{console.log('Слушаем порт ' + port)})