//Defining the requirements of the data model that we intend to map to our database

const mongoose = require('mongoose')
const Schema = mongoose.Schema

//Creating a new schema model - To write the format for our user model

const userSchema = new Schema({ //Creating model
    username: { type: String},
    email: { type: String},
    image: {type:String},
    subjects: [{type:String}],
    online: {type:Boolean},
    following: {type: Array}
})

const User = mongoose.model('User', userSchema) //Exporting model for use elsewhere
module.exports = User