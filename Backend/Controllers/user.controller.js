//Controlling what happens when you try to create, read, update or delete a model instance

const User = require('../models/user.models.js') //User Model from Schema
const router = require('express').Router() //Express


router.route('/new').post((req, res)=>{ //Req is the data that the front end is sending to the backend 
    const newUser = new User(req.body)  //Creating a new user using the data from frontend
    console.log('req.body: ', req.body);

    newUser.save()
        .then(user => res.json(user))
        .catch(err => res.status(400).json("Error! " + err))
})

router.route('/').get()

router.route('/delete/:id').delete()

router.route('/update/:id').put()

module.exports = router;