const express = require('express')
require('dotenv').config()  //Environmental vaiables in order to hide key
const cors = require('cors')
const mongoose = require('mongoose') //Mongoose carries data from express app to mongo DB
const userRoutes = require('./Controllers/user.controller.js') //Requiring controller so that the backend knows how to repond to requests
const chatRoutes = require('./Controllers/chat.controller.js') //Requiring controller so that the backend knows how to repond to requests





const app = express() //Express JS provides us with functions to swiftly build a back-end server


const PORT = process.env.PORT || 5000 //if process.env hasnt specified a PORT to use PORT 5000
const source = process.env.ATLAS_CONNECTION //Using .env connection


mongoose.connect(source, { //Mongoose.connect opens a connection between express app and mongo DB //URI is the our database to access
  useNewUrlParser: true, //configuring how mongoose should communicate with the database
  useCreateIndex: true,
  useUnifiedTopology: true
})

const connection = mongoose.connection //Listening server to check if connection is made
connection.once('open', () => {
    console.log("Connected to DB");
})


app.use(express.urlencoded({ extended: false })); //Parsing body of content
app.use(express.json()) //Telling express app that it should expect to recieve data in JSON format
app.use(cors()) //Cors allows app to accept requests from outside sources
app.use('/users', userRoutes) //Showing which routes app should use
app.use('/chat', chatRoutes) //Showing which routes app should use


//Implementing Socket io
const SocketIO = require('socket.io'); //Requiring websockets

const server = app.listen(PORT); //Bind application to the port

const io = SocketIO(server, { //Telling sokcets to listen to server
    cors: {
      origin: "*",
    },
  });


  

  const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";

  io.on("connection", (socket) => {
    
    // Join a conversation
    const { roomId } = socket.handshake.query;
    socket.join(roomId);
  
    // Listen for new messages
    socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
      io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, data);
    });
  
    // Leave the room if the user closes the socket
    socket.on("disconnect", () => {
      socket.leave(roomId);
    });
  });

//Connecting DB with express app










//Setting express app to serve data locally








































