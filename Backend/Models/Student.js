import mongoose from 'mongoose';


const studentSchema = mongoose.Schema({
    id: String,
    name: String,
    subjects:[String],
    section:{
        type:String,
        default:'A'
    },
})

const student = mongoose.model('student', studentSchema);

export default student