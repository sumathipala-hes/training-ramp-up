import AppDataSource from "../database"
import request from 'supertest';
import app from "../server";

const mockStudents = [
  {
    id: 1,
    name: "Sara",
    gender: "Female",
    address: "colombo",
    mobile: 771417685,
    dob: "2000-10-14",
    age: 23
  },
  {
    id: 2,
    name: "Hannah",
    gender: "Female",
    address: "colombo",
    mobile: 771417685,
    dob: "2000-10-14",
    age: 23
  },
]

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

  it('delete an existing student', async () => {
    const idToDelete = mockStudents[0].id;
    const res = await request(app).delete(`/students/${idToDelete}`);
    expect(res.statusCode).toEqual(204);
  })

  it('update an existing student', async () => {
    const idToUpdate = mockStudents[1].id;
    const res = await request(app).put(`/students/${idToUpdate}`);
    expect(res.statusCode).toEqual(204);
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

  it('delete a non-existing student', async () => {
    const nonExistentId = 800;
    const res = await request(app).delete(`/students/${nonExistentId}`);
    expect(res.statusCode).toEqual(400);
  });
})