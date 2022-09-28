const express = require("express");
const bodyParser = require('body-parser')
require('dotenv').config();
const connection = require('./db/mySql')
const apiProperties  = require('./routers/api/properties')

const PORT = process.env.PORT || '3002';

const app = express();


app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use('/api/properties', apiProperties)


app.listen(PORT, () =>{
    console.log(`app is runing on port ${PORT}`)
})