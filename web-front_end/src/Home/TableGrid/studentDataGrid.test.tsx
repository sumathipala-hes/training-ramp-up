import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import StudentDataGrid from "./StudentDataGrid";
import store from "../../redux/store";
import { studentActions } from "../../redux/studentSlice";

interface IStudentEntry {
  id: number;
  name: string;
  gender: string;
  address: string;
  mobileNumber: string;
  dateOfBirth: string;
  age: number;
}

describe("StudentDataGrid Component", () => {
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
        id: 2,
        name: "",
        gender: "",
        address: "",
        mobileNumber: "",
        dateOfBirth: "",
        age: 0,
      }).toEqual(store.getState().studentEntries.studentEntries[0]);
    });
    it("Add Student Fail", () => {
      render(
        <Provider store={store}>
          <StudentDataGrid />
        </Provider>,
      );

      const addButton = screen.getByRole("button", { name: "Add Student" });
      fireEvent.click(addButton);

      try {
        fireEvent.click(addButton);
      } catch (error) {
        expect(typeof error).toEqual("error");
      }
    });
  });

  describe("Edit Student", () => {
    it("Edit Student Success", () => {
      render(
        <Provider store={store}>
          <StudentDataGrid />
        </Provider>,
      );
      const student: IStudentEntry = {
        id: 1,
        name: "Nimesh",
        gender: "Male",
        address: "Galle",
        mobileNumber: "0777123456",
        dateOfBirth: new Date("1990-01-01").toDateString(),
        age: 33,
      };
      store.dispatch(studentActions.addStudentEntry(student));
      expect(store.getState().studentEntries.studentEntries[0]).toEqual(student);
    });
    it("Edit Student Fail", () => {
      render(
        <Provider store={store}>
          <StudentDataGrid />
        </Provider>,
      );
      const addButton = screen.getByRole("button", { name: "Add Student" });
      fireEvent.click(addButton);

      try {
        fireEvent.click(addButton);
      } catch (error) {
        expect(typeof error).toEqual("error");
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

      store.dispatch(studentActions.deleteStudentEntry(1));

      expect(
        store.getState().studentEntries.studentEntries[
          store.getState().studentEntries.studentEntries.length - 1
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
        store.dispatch(studentActions.deleteStudentEntry(1));
      } catch (error) {
        expect(typeof error).toEqual("error");
      }
    });
  });
});
