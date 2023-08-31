import {Request} from 'express'; 
import AppDataSource from "../config/dataSoure";
import { Student } from '../models/student';
import studentRepository from './repositories/studentRepo';
import { calculateAge } from '../utils';

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
    const age = calculateAge(req.body.birthday);

    const student = new Student()
    student.name = name;
    student.gender= gender;
    student.address = address;
    student.mobile = mobile;
    student.birthday = birthday;
    student.age = age;
    student.id = id;
    
    await AppDataSource.manager.save(student);
    io.sockets.emit("addStudent","A new student has been added.")
    return true;
}

//detete student from the database
async function deleteStudentDb(studentId:number, req: Request){
    const io = req.app.get('io');
    const student = await studentRepository.findOneBy({
        id: studentId,
    });
    if(student !== null){
        await studentRepository.remove(student);
        io.sockets.emit("deleteStudent","A student has been removed");
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
    const age = calculateAge(req.body.birthday);
    const id = req.body.id;
    

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
        io.sockets.emit("updateStudent","A student record has been updated");
        return true;
    }else{
        return false;
    }
}

export {fetchStudents, saveStudent, deleteStudentDb, updateStudentDb};