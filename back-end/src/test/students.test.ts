import request from "supertest";

import app from "../app";
import AppDataSource from "../config/dataSoure";

describe("STUDENT API TEST CASES", () => {
  const mockIo = {
    sockets: {
      emit: jest.fn(),
    },
  };

  app.set("io", mockIo);
          
  test("get all student data", async () => {
    await AppDataSource.initialize()
    const res = await request(app).get("/get-students");
    expect(res.statusCode).toEqual(200);
  });

  test("Delete route with invalid student id and expect 400 response", async () => {
    const res = await request(app).post("/remove-student").send({"id" : 1000});
    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual({"status": 400,"error": "No Student data found"});
  });

  test("Add student to the database and receive 200 status", async () => {
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
    )
    expect(res.body).toEqual({"status": 200});
  });

  test("Add invalid student to the database and receive 400 status", async () => {
    const res = await request(app).post("/add-student").send(
        {
            "id": "100",
            "age": 24,
            "name": "John",
            "gender": "male",
            "address": "Jon",
        }
    );
    expect(res.body).toEqual({
      "status": 400,
      "errors": [
          {
              "type": "field",
              "msg": "Mobile is required.",
              "path": "mobile",
              "location": "body"
          },
          {
              "type": "field",
              "value": "",
              "msg": "Invalid value",
              "path": "mobile",
              "location": "body"
          },
          {
              "type": "field",
              "value": "",
              "msg": "Mobile must be exactly 10 numbers.",
              "path": "mobile",
              "location": "body"
          },
          {
              "type": "field",
              "msg": "Birthday is required.",
              "path": "birthday",
              "location": "body"
          },
          {
              "type": "field",
              "value": "",
              "msg": "Birthday must be in the format \"YYYY-MM-DD\".",
              "path": "birthday",
              "location": "body"
          }
      ]
  });
  });

  test("Edit valid student using edit route and receive 200 status", async () => {
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

  
  test("Delete route with valid student id and receive 200 status", async () => {
    const res = await request(app).post("/remove-student").send({"id" : 100});
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({"status": 200});
  });

  test("Edit invalid student using edit route and receive 400 status", async () => {
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