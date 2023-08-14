
import {Request, Response} from 'express'; 
import { Student } from '../services/student';
import AppDataSource from "../services/dataSoure"

const getStudents = (async (req: Request, res: Response) => {
    try {
        const students = await AppDataSource.manager.find(Student);
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

export default getStudents;