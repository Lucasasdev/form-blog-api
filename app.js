const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const app = express()
const admin = require('./routes/admin.js')
const path = require('path')
const mongoose = require ('mongoose')

//configurações
  //body-parser
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended: true}))

    //handlebars
    app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}))
    app.set('view engine', 'handlebars')

    //mongoose
    mongoose.Promise =  global.Promise;
    mongoose.connect('mongodb://localhost/blogapp', {
        useNewUrlParser: true
        //useUnifiedTopology: true
    }).then(() => {
        console.log('Mongodb connected!')
        }).catch((error)=>{
            console.log(`conection error: ${error}!`)
    })
    
    //public
    app.use(express.static(path.join(__dirname, 'public')))

//rotas
    app.get('/', (req, res)=>{
        res.send('Rota Principal')
    })
    app.use('/admin', admin)
//outros

const PORT = 8081
app.listen(PORT, ()=>{
    console.log(`Connected in url http://localhost ${PORT}`)
})
