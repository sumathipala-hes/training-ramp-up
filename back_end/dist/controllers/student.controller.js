"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const student_service_1 = require("../services/student.service");
class StudentController {
    constructor() {
        this.addStudent = (req, res) => __awaiter(this, void 0, void 0, function* () {
            //create operation
            try {
                // destructuring assignment
                const newStudent = req.body;
                // save the student
                const student = yield (0, student_service_1.saveStudent)(newStudent);
                return res // return the response
                    .status(200)
                    .json({ message: 'New student added.!', responseData: student });
            }
            catch (error) {
                // catch block is used to handle the errors
                if (error instanceof Error) {
                    return res.status(500).json({ message: error.message });
                }
                else {
                    return res.status(500).json({ message: 'Unknown error occured.' });
                }
            }
        });
        this.retrieveAllStudents = (req, res) => __awaiter(this, void 0, void 0, function* () {
            //read operation
            try {
                // retrieve all the students
                let students = yield (0, student_service_1.retrieveAllStudents)();
                return res.status(200).json({ responseData: students });
            }
            catch (error) {
                // catch block is used to handle the errors
                if (error instanceof Error) {
                    return res.status(500).json({ message: error.message });
                }
                else {
                    return res.status(500).json({ message: 'Unknown error occured.' });
                }
            }
        });
        this.updateStudent = (req, res) => __awaiter(this, void 0, void 0, function* () {
            //update operation
            return res.status(200).json({ message: 'Student updated successfully' });
        });
        this.deleteStudent = (req, res) => __awaiter(this, void 0, void 0, function* () {
            //delete operation
            return res.status(200).json({ message: 'Student deleted successfully' });
        });
    }
}
exports.default = StudentController;
