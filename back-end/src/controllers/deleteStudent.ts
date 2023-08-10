
import {Request, Response} from 'express'; 
import { Student } from '../services/student';
import AppDataSource from "../services/dataSoure"

//delete student record
const deleteStudent = (async (req: Request, res: Response) => {
    try {
        const id = req.body.id;
        const studentRepository = AppDataSource.getRepository(Student)
        const student = await studentRepository.findOneBy({
            id: id,
        })
        if(student !== null){
            await studentRepository.remove(student);
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

export default deleteStudent;