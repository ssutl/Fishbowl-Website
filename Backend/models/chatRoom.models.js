const mongoose = require('mongoose')
const Schema = mongoose.Schema

//Creating a new schema model - To write the format for our user model

const chatSchema = new Schema({ //Creating model
    CreatedByName:{type:String},
    CreatedByImage:{type:String},
    CreationDate:{ type: Date, default: Date.now },
    Tags: {type:Array},
    Deleted: {type:Boolean},
    Title: {type:String},
    Question:{type:String},
    Messages:{type:Array},
    Answered:{type:Boolean},
    Post:{type:Boolean}
})

const Chat = mongoose.model('Chat', chatSchema) //Exporting model for use elsewhere
module.exports = Chat