"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const student_controller_1 = __importDefault(require("../controllers/student.controller"));
class StudentRoutes {
    constructor() {
        this.router = express_1.default.Router();
        this.studentController = new student_controller_1.default();
        this.configRoutes = () => {
            //POST /api/v1/student
            this.router.post("/", this.studentController.addStudent);
            //GET /api/v1/student
            this.router.get("/", this.studentController.retrieveAllStudents);
            //PUT /api/v1/student/:id
            this.router.put("/:id", this.studentController.updateStudent);
            //DELETE /api/v1/student/:id
            this.router.delete("/:id", this.studentController.deleteStudent);
        };
        this.getRouter = () => {
            return this.router;
        };
        this.configRoutes();
    }
}
exports.default = StudentRoutes;
