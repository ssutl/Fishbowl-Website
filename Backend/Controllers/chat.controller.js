const ChatRoom = require('../models/chatRoom.models.js') //User Model from Schema
const router = require('express').Router() //Express



router.post('/new',auth, (req, res)=>{ //Req is the data that the front end is sending to the backend 
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
            .then(room=> res.json(room))
            .catch(err => res.status(400).json("Error! " + err))

        }
    })  
})


router.get('/get', auth, (req,res)=>{
    ChatRoom.find()
        .then(allRooms => res.json(allRooms))
        .catch(err => res.status(400).json('Error! ' + err))
})

router.get('/get/:name',auth,(req,res)=>{
    ChatRoom.find({  CreatedByName: req.params.name})
        .then(SpecificRoom => res.json(SpecificRoom))
        .catch(err => res.status(400).json('Error! ' + err))
})

router.get('/get/Title/:name',auth,(req,res)=>{
    console.log('req: ', req);
    ChatRoom.find({  Title: req.params.name})
        .then(SpecificRoom => res.json(SpecificRoom))
        .catch(err => res.status(400).json('Error! ' + err))
})

router.get('/get/id/:id',auth,(req,res)=>{
    console.log('req: ', req);
    ChatRoom.find({  _id: req.params.id})
        .then(SpecificRoom => res.json(SpecificRoom))
        .catch(err => res.status(400).json('Error! ' + err))
})

router.delete('/delete/id/:id',auth,(req,res)=>{
    console.log('req: ', req);
    ChatRoom.findOneAndDelete({  _id: req.params.id})
        .then(SpecificRoom => res.json('Room deleted'))
        .catch(err => res.status(400).json('Error! ' + err))
})

//Update Chat Logs
router.put('/update/:id',auth, (req, res) => {
    console.log('content sent: ', req.body);
    if(Object.keys(req.body).includes("message")){
        ChatRoom.findOneAndUpdate({  _id: req.params.id}, { $addToSet: { Messages: req.body.message}})
        .then(msg => res.json('Success! Message Added to array.'))
        .catch(err => res.status(400).json('Error! ' + err))
    }else{
        ChatRoom.findOneAndUpdate({  _id: req.params.id}, req.body)
        .then(chat => res.json('Success! Field updated'))
        .catch(err => res.status(400).json('Error! ' + err))

    }
})

function auth(req, res, next) {
    //want to check for the token that is being sent along with the front end req
    var token = req.header("x-auth-token");
    // console.log('token passed through middleware: ', token);
  
    //Check for token
    if (!token) {
      res.status(401).json({ msg: "no token, auth denied" });
    }else{
        
        var segments = token.split('.');

        if (segments.length !== 3) {
        throw new Error('Not enough or too many segments');
        }

        // All segment should be base64
        var headerSeg = segments[0];
        var payloadSeg = segments[1];

        // base64 decode and parse JSON
        var header = Buffer.from(headerSeg, 'base64');


        var payload =  JSON.parse(Buffer.from(payloadSeg, 'base64'));

        if(payload.iss === 'accounts.google.com' || payload.aud === '39358098643-4utdojbmnngl2cbtnaccbhh8fard0hbj.apps.googleusercontent.com'){
            next()
        }else{
            res.status(401).json({ msg: "auth invalid" });
        }
    }
}

module.exports = router;