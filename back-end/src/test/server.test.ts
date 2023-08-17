import request from "supertest";

import app from "../app";
import AppDataSource from "../services/dataSoure";

describe("API TEST CASES", () => {
          
  test("get all student data", async () => {
    await AppDataSource.initialize()
    const res = await request(app).get("/get-students");
    expect(res.statusCode).toEqual(200);
  });

  test("Delete route with invalid student id", async () => {
    const res = await request(app).post("/remove-student").send({"id" : 1000});
    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual({"status": 400,"error": "No Student data found"});
  });

  test("Add student to the database", async () => {
    const res = await request(app).post("/add-student").send(
        {
            "id": 100,
            "name": "John",
            "gender": "male",
            "address": "Jon",
            "mobile": "0715426257",
            "birthday": "1999-08-01",
            "age": 24
        }
    );
    expect(res.body).toEqual({"status": 200});
  });

  test("Add invalid student to the database", async () => {
    const res = await request(app).post("/add-student").send(
        {
            "id": "100",
            "age": 24
        }
    );
    expect(res.statusCode).toEqual(400);
  });

  test("Edit valid student using edit route", async () => {
    const res = await request(app).post("/update-student").send(
        {
            "id": 100,
            "name": "John Doe",
            "gender": "male",
            "address": "Colombo",
            "mobile": "0715426257",
            "birthday": "1999-08-01",
            "age": 24
        }
    );
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({"status": 200});
  });

  
  test("Delete route with valid student id", async () => {
    const res = await request(app).post("/remove-student").send({"id" : 100});
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({"status": 200});
  });

  test("Edit invalid student using edit route", async () => {
    const res = await request(app).post("/update-student").send(
        {
            "id": 100,
            "name": "John Doe",
            "gender": "male",
            "address": "Colombo",
            "mobile": "0715426257",
            "birthday": "1999-08-01",
            "age": 24
        }
    );
    expect(res.body).toEqual({"status": 400,"error": "No Student data found"});
    await AppDataSource.destroy();
  });
});