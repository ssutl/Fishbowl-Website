const ChatRoom = require('../models/chatRoom.models.js') //User Model from Schema
const router = require('express').Router() //Express



router.route('/new').post((req, res)=>{ //Req is the data that the front end is sending to the backend 
    console.log('req from login: ', req);
    const {Title} = req.body;
    console.log('Title: ', Title);

    ChatRoom.findOne({Title})
    .then((room)=>{
        if(room){
            return res.status(200).json({ msg: "Room name already exists" }); //if true that means user is already present in the DB
        }else{
            const newChatRoom = new ChatRoom(req.body);

            newChatRoom.save()
            .then(room=> res.json("Created Chat Room"))
            .catch(err => res.status(400).json("Error! " + err))

        }
    })


    

    
})


router.route('/get').get((req,res)=>{
    ChatRoom.find()
        .then(allRooms => res.json(allRooms))
        .catch(err => res.status(400).json('Error! ' + err))
})

router.route('/get/:id').get((req,res)=>{
    ChatRoom.find({  CreatedById: req.params.id})
        .then(SpecificRoom => res.json(SpecificRoom))
        .catch(err => res.status(400).json('Error! ' + err))
})


module.exports = router;