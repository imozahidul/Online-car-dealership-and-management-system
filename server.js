const express = require ('express')
// dot env type er file niye kaj korar jonno
const dotenv = require('dotenv')
// show type of request in terminal
const morgan = require('morgan')
// read the data from the form
const bodyparser = require('body-parser')
// for creating virtual path
const path = require('path')



// data base connect
const connectDB = require('./server/database/connection');
const app = express()

// access the cnv file
dotenv.config( {path : 'config.env'})
// if port not found in env then use 8080
const PORT = process.env.PORT || 8080

//log request
// console e show korbe :method :url :status :res[content-length] - :response-time ms. formate e
app.use(morgan('tiny'));

// mongodb connection
connectDB();


// parse request to body - parser
// url theke data parse korbe (middleware for parsing bodies from URL)
app.use(bodyparser.urlencoded({extended : true}))

// set view engine
// sellecting ejs view engine
app.set("view engine","ejs")


//load assets
app.use('/css', express.static(path.resolve(__dirname,"assets/css")))
app.use('/img', express.static(path.resolve(__dirname,"assets/img")))
app.use('/needs', express.static(path.resolve(__dirname,"assets/needs")))
app.use('/js', express.static(path.resolve(__dirname,"assets/js")))

// load routers

app.use('/',require('./server/routes/router'))


app.listen(PORT, () => {console.log(`Server is running on http://localhost:${PORT}`)})