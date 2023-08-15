import {Request} from 'express'; 
import AppDataSource from "../services/dataSoure";
import { Student } from '../models/student';

interface studentData{
    id:number,
    name: string,
    gender: string,
    address: string,
    mobile: string
    birthday: string,
    age: number,
  }
function fetchStudents(){
    const students = AppDataSource.manager.find(Student);
    return students;
}

async function saveStudent(student:studentData, req: Request){
    const io = req.app.get('io');
    try{
        await AppDataSource.manager.save(student);
        try{
            io.sockets.emit("addStudent","A new student has been added.")
        } catch(error){
            console.log(error); 
        }
        return {status:200}
    }
    catch(err){
        return{status:500, err:err}
    }

}

async function deleteStudentDb(studentId:number, req: Request){
    const studentRepository = AppDataSource.getRepository(Student);
    const io = req.app.get('io');
    const student = await studentRepository.findOneBy({
        id: studentId,
    });
    if(student !== null){
        await studentRepository.remove(student);
        try{
            io.sockets.emit("deleteStudent","A student has been removed");
        } catch(error){
            console.log(error) 
        }
        return true;
    }else{
        return false;
    }
}

async function updateStudentDb(req: Request){
    const io = req.app.get('io');
    const name = req.body.name;
    const gender = req.body.gender
    const address = req.body.address;
    const mobile = req.body.mobile;
    const birthday = req.body.birthday;
    const age = req.body.age;
    const id = req.body.id;

    const studentRepository = AppDataSource.getRepository(Student);
    const student = await studentRepository.findOneBy({
        id: id,
    });
    if(student !== null){
        student.name = name;
        student.gender= gender;
        student.address = address;
        student.mobile = mobile;
        student.birthday = birthday;
        student.age = age;

        await studentRepository.save(student);
        
        try{
            io.sockets.emit("updateStudent","A student record has been updated");
        } catch(error){
           console.log(error) 
        }
        return true;
    }else{
        return false;
    }
}

export {fetchStudents, saveStudent, deleteStudentDb, updateStudentDb};