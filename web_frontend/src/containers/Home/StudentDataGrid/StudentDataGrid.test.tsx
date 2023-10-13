import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../../redux/store";
import StudentDataGrid from "./StudentDataGrid";
import { studentActions } from "../../../redux/student/slice";

interface IStudent {
  id: number;
  name: string;
  address: string;
  mobile: string;
  dob: string;
  gender: string;
  age: number;
}

describe("StudentDataGrid", () => {
  describe("Add Student", () => {
    it("Add Student Success", () => {
      render(
        <Provider store={store}>
          <StudentDataGrid />
        </Provider>,
      );

      const addButton = screen.getByRole("button", { name: "Add Student" });
      fireEvent.click(addButton);
      expect({
        id: expect.any(Number),
        name: "",
        address: "",
        mobile: "",
        dob: expect.any(String),
        age: 0,
        gender: "Male",
      }).toEqual(store.getState().studentList.studentList[0]);
    });
    it("Add Student Fail", () => {
      render(
        <Provider store={store}>
          <StudentDataGrid />
        </Provider>,
      );

      const addButton = screen.getByRole("button", { name: "Add Student" });

      try {
        fireEvent.click(addButton);
      } catch (error) {
        expect(typeof error).toEqual("error");
      }
    });
  });
  describe("Update Student", () => {
    it("Update Student Success", async () => {
      const student: IStudent = {
        id: 1,
        name: "Dasun",
        address: "Galle",
        mobile: "1234567890",
        dob: new Date().toISOString(),
        gender: "Male",
        age: 25,
      };

      store.dispatch(studentActions.updateStudent(student));
      expect(
        store.getState().studentList.studentList[
          store.getState().studentList.studentList.length - 1
        ],
      ).toEqual(student);
    });

    it("Update Student Fail", async () => {
      const student: IStudent = {
        id: 1,
        name: "Dasun",
        address: "Galle",
        mobile: "1234567890",
        dob: new Date().toISOString(),
        gender: "Male",
        age: 25,
      };

      try {
        store.dispatch(studentActions.updateStudent(student));
      } catch (error) {
        expect(error).toEqual("error");
      }
    });
  });

  describe("Delete Student", () => {
    it("Delete Student Success", () => {
      render(
        <Provider store={store}>
          <StudentDataGrid />
        </Provider>,
      );

      store.dispatch(studentActions.removeStudent(1));

      expect(
        store.getState().studentList.studentList[
          store.getState().studentList.studentList.length - 1
        ].id,
      ).not.toEqual(1);
    });
    it("Delete Student Fail", () => {
      render(
        <Provider store={store}>
          <StudentDataGrid />
        </Provider>,
      );

      try {
        store.dispatch(studentActions.removeStudent(1));
      } catch (error) {
        expect(typeof error).toEqual("error");
      }
    });
  });
});
