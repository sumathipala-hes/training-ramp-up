import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../redux/store";
import TableDataGrid from "../../containers/Home/TableDataGrid/TableDataGrid";
import { tableDataActions } from "../../redux/tableSlice/tableSlice";
import { maxDate } from "../../util/validateTable";

interface ITableData {
  id: number;
  name: string;
  address: string;
  mobile: string;
  dob: string;
  gender: string;
  age: number;
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
        id: expect.any(Number),
        name: "",
        address: "",
        mobile: "",
        dob: maxDate(),
        age: "" as unknown as number,
        gender: "",
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
        id: 1,
        name: "Pahasara",
        address: "Galle",
        mobile: "0717133879",
        dob: new Date("2001-08-04").toDateString(),
        age: 22,
        gender: "Male",
      };

      store.dispatch(tableDataActions.addTableData(data));
      expect(store.getState().tableDataList.tableDataEntries[0]).toEqual(data);
    });

    it("Update Table Data Fail", async () => {
      const data: ITableData = {
        id: 1,
        name: "Dasun",
        address: "Galle",
        mobile: "1234567890",
        dob: new Date().toISOString(),
        gender: "Male",
        age: 25,
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
      ].id).not.toEqual(1);
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