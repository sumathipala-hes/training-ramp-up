
import {Request, Response} from 'express'; 
import { Student } from '../services/student';
import AppDataSource from "../services/dataSoure"

//update student data
const updateStudent = (async (req: Request, res: Response) => {
    try {
        const name = req.body.name;
        const gender = req.body.gender
        const address = req.body.address;
        const mobile = req.body.mobile;
        const birthday = req.body.birthday;
        const age = req.body.age;
        const id = req.body.id;

        const studentRepository = AppDataSource.getRepository(Student)
        const student = await studentRepository.findOneBy({
            id: id,
        })
        if(student !== null){
            student.name = name;
            student.gender= gender;
            student.address = address;
            student.mobile = mobile;
            student.birthday = birthday;
            student.age = age;
            student.id = id;

            await studentRepository.save(student)
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

export default updateStudent;