import {Request, Response} from 'express'; 
import { fetchStudents, saveStudent, deleteStudentDb, updateStudentDb } from '../services/student';
import { calculateAge } from '../utils';

//get all students
const getStudents = (async (req: Request, res: Response) => {
    try {
        const students = await fetchStudents();
            return res.status(200).json({
                status: 200,
                data:students
            });
    } catch (err) {
        if (err instanceof Error) {
            // 'err' is now recognized as an instance of the 'Error' class
            return res.status(400).json({
                status: 400,
                error: err.message,
            });
        } else {
            // Handle the case when 'err' is of unknown type
            return res.status(500).json({
                status: 500,
                error: "An unknown error occurred.",
            });
        }
    }
});

//add student data
const addStudent = (async (req: Request, res: Response) => {
    try {
        req.body.age = calculateAge(req.body.birthday);
        if(req.body.age  <18){
            throw new Error("age is less than 18");
        }
        const isSaved = await saveStudent(req);
        if(isSaved){
            return res.status(200).json({
                status: 200,
            });
        }else{
            throw new Error("Failed to save the student data");
        }

    } catch (err) {
        if (err instanceof Error) {
            return res.status(400).json({
                status: 400,
                error: err.message,
            });
        } else {
            // Handle the case when 'err' is of unknown type
            return res.status(500).json({
                status: 500,
                error: "An unknown error occurred.",
            });
        }
    }
});

//delete student record
const deleteStudent = (async(req: Request, res: Response) => {
    const id = req.body.id;
    try {
        const isDeleted = await deleteStudentDb(id, req);
        if(isDeleted){
            return res.status(200).json({
                status: 200,
            });
        }else{
            throw new Error("No Student data found");
        }
    } catch (err) {
        if (err instanceof Error) {
            return res.status(400).json({
                status: 400,
                error: err.message,
            });
        } else {
            // Handle the case when 'err' is of unknown type
            return res.status(500).json({
                status: 500,
                error: "An unknown error occurred.",
            });
        }
    }
});

//update student data
const updateStudent = (async (req: Request, res: Response) => {
    try {
        req.body.age = calculateAge(req.body.birthday);
        if(req.body.age  <18){
            throw new Error("age is less than 18");
        }
        const isUpdated = await updateStudentDb(req);
        if(isUpdated){
            return res.status(200).json({
                status: 200,
            });
        }else{
            throw new Error("No Student data found");
        }
    } catch (err) {
        if (err instanceof Error) {
            return res.status(400).json({
                status: 400,
                error: err.message,
            });
        } else {
            // Handle the case when 'err' is of unknown type
            return res.status(500).json({
                status: 500,
                error: "An unknown error occurred.",
            });
        }
    }
});

export {addStudent,getStudents, deleteStudent, updateStudent};