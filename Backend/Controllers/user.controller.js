//Controlling what happens when you try to create, read, update or delete a model instance

const User = require('../models/user.models.js') //User Model from Schema
const router = require('express').Router() //Express


router.route('/new').post((req, res)=>{ //Req is the data that the front end is sending to the backend 
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

router.route('/get').get((req,res)=>{
    User.find()
        .then(allUsers => res.json(allUsers))
        .catch(err => res.status(400).json('Error! ' + err))
})

router.route('/get/:name').get((req,res)=>{
    User.find({ username: req.params.name })
        .then(specificUser => res.json(specificUser))
        .catch(err => res.status(400).json('Error! ' + err))
})

router.route('/delete/:id').delete((req, res) => {
    User.deleteOne({ _id: req.params.id })
        .then(success => res.json('Success! User deleted.'))
        .catch(err => res.status(400).json('Error! ' + err))
})

router.route('/update/:id').put((req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body)
        .then(user => res.json('Success! User updated.'))
        .catch(err => res.status(400).json('Error! ' + err))
})

module.exports = router;