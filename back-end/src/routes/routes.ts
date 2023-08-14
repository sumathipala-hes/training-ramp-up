import { StudentController } from "../controller/StudentController";

export const Routes = [
  {
    method: "get",
    route: "/students",
    controller: StudentController,
    action: "getAllStudents",
  },
  {
    method: "get",
    route: "/students/:id",
    controller: StudentController,
    action: "getStudent",
  },
  {
    method: "post",
    route: "/students",
    controller: StudentController,
    action: "addStudent",
  },
  {
    method: "delete",
    route: "/students/:id",
    controller: StudentController,
    action: "deleteStudent",
  },
  {
    method: "put",
    route: "/students/:id",
    controller: StudentController,
    action: "updateStudent",
  },
  {
    method: "delete",
    route: "/students",
    controller: StudentController,
    action: "deleteAllStudents",
  },
];
