//Controlling what happens when you try to create, read, update or delete a model instance

const User = require('../models/user.models.js') //User Model from Schema
const router = require('express').Router() //Express


router.post('/new',auth,(req, res)=>{ //Req is the data that the front end is sending to the backend 
    console.log('req from login: ', req);
    const {username, email, image, online} = req.body;
    
    User.findOne({ username })
    .then((user)=>{
        if (user) {
            return res.status(200).json({ msg: "user already exists" }); //if true that means user is already present in the DB
        }else{
            const newUser = new User(req.body)
            console.log('req.body: ', req.body);
            
            newUser.save()
            .then(user => res.json("Created User"))
            .catch(err => res.status(400).json("Error! " + err))
        } 
    })



})

router.get('/get',auth,(req,res)=>{
    User.find()
        .then(allUsers => res.json(allUsers))
        .catch(err => res.status(400).json('Error! ' + err))
})

router.get('/get/:name',auth, (req,res)=>{
    User.find({ username: req.params.name })
        .then(specificUser => res.json(specificUser))
        .catch(err => res.status(400).json('Error! ' + err))
})

router.delete('/delete/:name',auth,(req, res) => {
    User.deleteOne({ username: req.params.name })
        .then(success => res.json('Success! User deleted.'))
        .catch(err => res.status(400).json('Error! ' + err))
})

router.put('/update/:name',auth, (req, res) => {
    console.log("LOOK AT ME BOI", req.params)
    if(Object.keys(req.body).includes("following")){
        User.findOneAndUpdate({username: req.params.name},{ $addToSet: { following: req.body.following}})
        .then(user => res.json('user followed'))
        .catch(err => res.status(400).json('Error! ' + err))
    }else if(Object.keys(req.body).includes("unfollowing")){
        User.findOneAndUpdate({username: req.params.name},{ $pull: { following: req.body.unfollowing}})
        .then(user => res.json('user unfollowed'))
        .catch(err => res.status(400).json('Error! ' + err))
    }else{
        User.findOneAndUpdate({username: req.params.name}, req.body)
        .then(user => res.json('Success! User updated.'))
        .catch(err => res.status(400).json('Error! ' + err))
    }
})


function auth(req, res, next) {
    //want to check for the token that is being sent along with the front end req
    var token = req.header("x-auth-token");
    console.log('token passed through middleware: ', token);
  
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
        console.log('header: ', header);


        var payload =  JSON.parse(Buffer.from(payloadSeg, 'base64'));
        console.log('payload: ', payload);

        if(payload.iss === 'accounts.google.com' || payload.aud === '39358098643-4utdojbmnngl2cbtnaccbhh8fard0hbj.apps.googleusercontent.com'){
            console.log('auth valid')
            next()
        }else{
            console.log('auth invalid')
            res.status(401).json({ msg: "auth invalid" });
        }
    }
}


module.exports = router;