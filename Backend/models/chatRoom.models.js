const mongoose = require('mongoose')
const Schema = mongoose.Schema

//Creating a new schema model - To write the format for our user model

const chatSchema = new Schema({ //Creating model
    CreatedById:{type:String},
    CreationDate:{ type: Date, default: Date.now },
    Tags: {type:Object},
    Deleted: {type:Boolean},
    Title: {type:String},
    Question:{type:String}
})

const Chat = mongoose.model('Chat', chatSchema) //Exporting model for use elsewhere
module.exports = Chat