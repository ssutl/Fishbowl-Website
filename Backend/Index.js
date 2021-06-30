import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import studentRoutes from './Routes/student.js'


const app = express();


app.use('/students',studentRoutes)
app.use(express.json({limit:"30mb", extended:true}));
app.use(express.urlencoded({limit:"30mb", extended:true}));

app.use(cors());

const CONNECTION_URL = 'mongodb+srv://Shay:Shay123@cluster0.tz5dl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, { //To avoid warning and errors in the console
    useNewUrlParser:true, useUnifiedTopology:true
}).then(()=>app.listen(PORT,()=>{
    console.log(`connection is established and running on port: ${PORT}`)
})).catch((err)=>console.log(err.message));

mongoose.set('useFindAndModify', false); //To avoid warning and errors in the console




































