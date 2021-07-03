
require('dotenv').config()

//The main hub for our app and the connection to the DB

const express = require('express')
const app = express() //Express JS provides us with functions to swiftly build a back-end server


const cors = require('cors')
app.use(cors()) //Cors allows app can now accept requests from outside sources

app.use(express.json()) //Telling express app that it should expect to recieve data in JSON format


//Connecting DB with express app

const mongoose = require('mongoose') //Mongoose carries data from express app to mongo DB

const source = process.env.ATLAS_CONNECTION //Using .env connection

mongoose.connect(source, { //Mongoose.connect opens a connection between express app and mongo DB //URI is the our database to access
    useNewUrlParser: true, //configuring how mongoose should communicate with the database
    useCreateIndex: true,
    useUnifiedTopology: true
})

const connection = mongoose.connection //Listening server to check if connection is made
connection.once('open', () => {
    console.log("DB connected.");
})

//Setting express app to serve data locally

const PORT = process.env.PORT || 5000 //if process.env hasnt specified a PORT to use PORT 5000
app.listen(PORT, ()=>{
    console.log(`Successfully served on port: ${PORT}.`);
})
