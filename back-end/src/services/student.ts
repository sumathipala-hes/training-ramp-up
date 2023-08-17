import {Request} from 'express'; 
import AppDataSource from "../services/dataSoure";
import { Student } from '../models/student';

//get student from the database
function fetchStudents(){
    const students = AppDataSource.manager.find(Student);
    return students;
}

//add student to the database
async function saveStudent(req: Request){
    const io = req.app.get('io');
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
        await AppDataSource.manager.save(student);
        try{
            io.sockets.emit("addStudent","A new student has been added.")
        } catch(error){
            console.log(error); 
        }
        return true;
}

//detete student from the database
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

//update student data from the database
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