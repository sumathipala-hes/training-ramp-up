import AppDataSource from "./database"
import request from "supertest";
import app from "./server";

describe('API Functions', () => {

  beforeAll(async () => {
    await AppDataSource.initialize();
  });

  afterAll(async () => {
    await AppDataSource.destroy();
  });

  it('get all students', async () => {
    const res = await request(app).get('/students');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  })

  it('create a new student', async () => {
    const newStudentData = {
      name: "Jane",
      gender: "Female",
      address: "colombo",
      mobile: 987654321,
      dob: "2002-01-01",
      age: 21
    };
    const res = await request(app).post('/students').send(newStudentData);
    expect(res.statusCode).toEqual(200);
  })

  it('update an existing student', async () => {
    const updatedStudentData = {
      name: "Zac",
      gender: "Male"
    };
    const res = (await request(app).put(`/students/1`).send(updatedStudentData));
    expect(res.statusCode).toEqual(204);
  })

  it('delete an existing student', async () => {
    const res = await request(app).delete(`/students/2`);
    expect(res.statusCode).toEqual(204);
  })

  it('delete a non-existing student', async () => {
    const nonExistentId = 800;
    const res = await request(app).delete(`/students/${nonExistentId}`);
    expect(res.statusCode).toEqual(400);
  });
})