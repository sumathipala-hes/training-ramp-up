import {Request, Response} from 'express'; 
import { Student } from '../models/student';
import { fetchStudents, saveStudent, deleteStudentDb, updateStudentDb } from '../services/student';

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
            return res.status(500).json({
                status: 500,
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
        const id = req.body.id;
        const name = req.body.name;
        const gender = req.body.gender
        const address = req.body.address;
        const mobile = req.body.mobile;
        const birthday = req.body.birthday;
        const age = req.body.age;

        const student = new Student()
        student.name = name;
        student.gender= gender;
        student.address = address;
        student.mobile = mobile;
        student.birthday = birthday;
        student.age = age;
        student.id = id;

        const saveProcess = await saveStudent(student, req);
        if(saveProcess.status === 500){
            throw new Error("Failed to save the student data");
        }
        return res.status(200).json({
            status: 200,
        });

    } catch (err) {
        if (err instanceof Error) {
            return res.status(500).json({
                status: 500,
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
            return res.status(500).json({
                status: 500,
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
            return res.status(500).json({
                status: 500,
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