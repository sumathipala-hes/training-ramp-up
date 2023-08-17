import {Request, Response} from 'express'; 
import { Student } from '../services/student';
import AppDataSource from "../services/dataSoure"

//add student data
const addStudent = (async (req: Request, res: Response) => {
    try {
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

        await AppDataSource.manager.save(student)
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

export default addStudent;