const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const PORT = "3000"
const Router = require('./Routes/routes')

app.use(cors({origin:true}))
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

const dbURL = "mongodb://localhost:27017/DPboss"
mongoose.connect(dbURL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log("Connected to database...");
})

app.use('/', Router)

app.listen(PORT, ()=>{
    console.log("Listining to PORT at:", PORT);
})