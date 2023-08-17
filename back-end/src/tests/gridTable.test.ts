import request from 'supertest'
import { DataSource, createConnection } from 'typeorm'
import app from '../index' // Assuming your Express app is exported from index.ts
import express from 'express'
import cors from 'cors'
import http from 'http'
import { connectionOptions } from '../ormconfig'

// Import other necessary modules and configurations for testing

app.use(cors())
app.use(express.json())
let connection: DataSource
const server = http.createServer(app)
beforeAll(async () => {
  try {
    connection = await createConnection(connectionOptions)
    console.log('Connected to postgres')
    server.listen(5001, () => {
      console.log(`⚡️[server]: Server is running without errors Now at the  http://localhost:${5001}`)
    })
  } catch (err) {
    console.error('Unable to connect to postgres:', err)
  }
})
afterAll(async () => {
  await connection.close()
  server.close()
})

describe('Student API', () => {
  it('should get a list of students', async () => {
    const response = await request(server).get('/api/student')

    expect(response.status).toBe(200)
    expect(response.body).toBeInstanceOf(Array)
    // Add more assertions to validate the response body
  })

  it('should create a new student', async () => {
    const response = await request(server).post('/api/student').send({
      id: 5678,
      age: 20,
      name: 'John Doe',
      dateofbirth: '2003-01-01',
      gender: 'Male',
      mobilenumber: 1234567890,
      address: '123 Main St',
    })

    expect(response.status).toBe(200)
    // Add more assertions to validate the response body
  })

  it('should update a student', async () => {
    // Create a student first
    await request(server).post('/api/student').send({
      id: 7654,
      name: 'Jane Smith',
      age: 26,
      dateofbirth: '2001-05-10',
      gender: 'Female',
      mobilenumber: 987654,
      address: '456 Oak St',
    })

    const studentId = 7654

    const updateResponse = await request(server).put(`/api/student/${studentId}`).send({
      name: 'Jane Parker',
      age: 28,
      dateofbirth: '1998-03-15',
      gender: 'Non-Binary',
      mobilenumber: 55555,
      address: '789 Pine St',
    })

    expect(updateResponse.status).toBe(200)
    // Add more assertions to validate the response body
  })

  it('should delete a student', async () => {
    // Create a student first

    const deleteResponse = await request(server).delete(`/api/student/7654`)

    expect(deleteResponse.status).toBe(200)
    // Verify that the student is actually deleted by fetching it
    const fetchResponse = await request(server).get(`/api/student/7654`)
    expect(fetchResponse.status).toBe(404)
  })
})
