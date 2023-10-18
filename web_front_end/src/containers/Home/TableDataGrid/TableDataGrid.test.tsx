import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../../redux/store";
import TableDataGrid from "./TableDataGrid";
import { tableDataActions } from "../../../redux/tableSlice/tableSlice";
import { maxDate } from "../../../util/validateTable";

interface ITableData {
    studentId: number;
    studentName: string;
    studentAddress: string;
    studentMobile: string;
    studentDob: string;
    studentGender: string;
}

describe("TableDataGrid", () => {
  describe("addTableData", () => {
    it("Add Table Data Success", () => {
      render(
        <Provider store={store}>
          <TableDataGrid />
        </Provider>,
      );

      const addButton = screen.getByRole("button", { name: "Add Student" });
      fireEvent.click(addButton);
      expect({
        studentId: expect.any(Number),
        studentName: "",
        studentAddress: "",
        studentMobile: "",
        studentDob: maxDate(),
        age: 0,
        studentGender: "",
      }).toEqual(store.getState().tableDataList.tableDataEntries[0]);
    });
    it("Add Table Data Fail", () => {
      render(
        <Provider store={store}>
          <TableDataGrid />
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
  describe("updateTableData", () => {
    it("Update Table Data Success", async () => {
      const data: ITableData = {
        studentId: 1,
        studentName: "Pahasara",
        studentAddress: "Galle",
        studentMobile: "0717133879",
        studentDob: new Date("2001-08-04").toDateString(),
        studentGender: "Male",
      };

      store.dispatch(tableDataActions.addTableData(data));
      expect(store.getState().tableDataList.tableDataEntries[0]).toEqual(data);
    });

    it("Update Table Data Fail", async () => {
      const data: ITableData = {
        studentId: 1,
        studentName: "Dasun",
        studentAddress: "Galle",
        studentMobile: "1234567890",
        studentDob: new Date().toISOString(),
        studentGender: "Male",
      };

      try {
        store.dispatch(tableDataActions.updateTableData(data));
      } catch (error) {
        expect(error).toEqual("error");
      }
    });
  });

  describe("removeTableData", () => {
    it("Remove Table Data Success", () => {
      render(
        <Provider store={store}>
          <TableDataGrid />
        </Provider>,
      );

      store.dispatch(tableDataActions.removeTableData(1));

      expect(store.getState().tableDataList.tableDataEntries[
        store.getState().tableDataList.tableDataEntries.length - 1
      ].studentId).not.toEqual(1);
    });
    it("Remove Table Data Fail", () => {
      render(
        <Provider store={store}>
          <TableDataGrid />
        </Provider>,
      );

      try {
        store.dispatch(tableDataActions.removeTableData(1));
      } catch (error) {
        expect(typeof error).toEqual("error");
      }
    });
  });
});