import request from "supertest";

import app from "../app";
import AppDataSource from "../config/dataSoure";

describe("USER API TEST CASES", () => {
    
  test("Register a user and expect 200 status", async () => {
    await AppDataSource.initialize()
    const res = await request(app).post("/register").send({"name" : "John", "username":"john@gmail.com", "role":"user", "password":"abcd1234"});
    // expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({"status": 200});
  });

  test("Register an invalid user and expect 400 status", async () => {
    const res = await request(app).post("/register").send({"name" : "John", "username":"johngmail.com", "role":"user"});
    expect(res.body).toEqual({
        "status": 400,
        "errors": [
            {
                "type": "field",
                "value": "johngmail.com",
                "msg": "Username should be a valid email adddress.",
                "path": "username",
                "location": "body"
            },
            {
                "type": "field",
                "msg": "Password is required.",
                "path": "password",
                "location": "body"
            }
        ]
    });
  });

  test("login invalid user and expect 400 status", async () => {
    const res = await request(app).post("/login").send(
        {
            "username": "johngmailcom"
        }
    );
    expect(res.body).toEqual({
        "status": 400,
        "errors": [
            {
                "type": "field",
                "value": "johngmailcom",
                "msg": "Username should be a valid email adddress.",
                "path": "username",
                "location": "body"
            },
            {
                "type": "field",
                "msg": "Password is required.",
                "path": "password",
                "location": "body"
            }
        ]
    });
  });

  test("Enter a wrong passowrd and expect 400 status", async () => {
    const res = await request(app).post("/login").send(
        {
            "username": "john@gmail.com",
            "password": "abcd1256"
        }
    );
    expect(res.statusCode).toEqual(400);
  });

  test("login valid user and expect 200 status", async () => {
    const res = await request(app).post("/login").send(
        {
            "username": "john@gmail.com",
            "password": "abcd1234"
        }
    );
    
    expect(res.statusCode).toEqual(200);
  });

  test("logout user and expect 200 status", async () => {
    const res = await request(app).get("/log-out");
    expect(res.statusCode).toEqual(200);
    await AppDataSource.destroy();
  });
});