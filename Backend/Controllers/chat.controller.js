const ChatRoom = require('../models/chatRoom.models.js') //User Model from Schema
const router = require('express').Router() //Express



router.route('/new').post((req, res)=>{ //Req is the data that the front end is sending to the backend 
    console.log('req from login: ', req);
    const newChatRoom = new ChatRoom(req.body);

    newChatRoom.save()
    .then(room=> res.json("Created Chat Room"))
    .catch(err => res.status(400).json("Error! " + err))
})


module.exports = router;