import express from 'express';
import {getStudents, createStudent} from '../Controllers/student'
import student from '../Models/Student.js'



const router = express.Router();


router.get('/', getStudents)
router.post('/', createStudent)


export default router;