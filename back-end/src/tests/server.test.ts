import AppDataSource from '../config/database';
import request from 'supertest';
import app from '../server';

describe('API Functions', () => {
  beforeAll(async () => {
    await AppDataSource.initialize();
  });

  afterAll(async () => {
    await AppDataSource.destroy();
  });

  it('logs in a user', async () => {
    const response = await request(app)
      .post('/login')
      .send({ username: 'testuser@google.com', password: 'password123' });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
    expect(response.body).toHaveProperty('message', 'LOGGED IN');
  });

  it('registers a new user', async () => {
    const response = await request(app)
      .post('/register')
      .send({ username: 'testuser5@google.com', password: 'password123', role: 'user' });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
    expect(response.body).toHaveProperty('message', 'USER REGISTERED');
  });

  it('fails to register an existing user', async () => {
    const response = await request(app)
      .post('/register')
      .send({ username: 'testuser@google.com', password: 'password123', role: 'admin' });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty( 'message', 'User already exists' );
  });

  it('logs out a user', async () => {
    const response = await request(app).post('/logout');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'LOGGED OUT' });
  });

  it('failing validations for invalid data', async () => {
    const response = await request(app)
      .post('/register')
      .send({ username: 'testuser2google.com', password: '123', role: 'no-role' });
    expect(response.status).toBe(400);
  });

  it('return 401 if no access token is provided', async () => {
    const response = await request(app).get('/userAuth');
    expect(response.status).toBe(401);
  });

  it('logs in a user that doesnt exit', async () => {
    const response = await request(app)
      .post('/login')
      .send({ username: 'unknown@google.com', password: 'password123' });
    expect(response.status).toBe(400);
  });

  it('logs in a user with wrong password', async () => {
    const response = await request(app)
      .post('/login')
      .send({ username: 'testuser@google.com', password: 'wrongpassword' });
    expect(response.status).toBe(400);
  });

  it('return 200 for verified jwt tokens', async () => {
    const response = await request(app)
      .post('/login')
      .send({ username: 'testuser@google.com', password: 'password123' });
    const accessToken = response.body.token;
    const authResponse = await request(app)
    .get('/userAuth')
    .set('Cookie', `access-token=${accessToken}`);
    expect(authResponse.status).toBe(200);
    expect(authResponse.body).toBe('User is Authenticated');
  });

  it('crud operations for verified user', async () => {
    const newStudentData = {
      name: 'Jane',
      gender: 'Female',
      address: 'colombo',
      mobile: "1894567814",
      dob: '2002-01-01',
      age: 21,
    };

    const updatedStudentData = {
      name: 'Zac',
      gender: 'Male',
    };

    const response = await request(app)
      .post('/login')
      .send({ username: 'testuser@google.com', password: 'password123' });
    const accessToken = response.body.token;
    
    const getResponse = await request(app)
      .get('/students')
      .set('Cookie', `access-token=${accessToken}`);
    expect(getResponse.status).toBe(200);
    expect(Array.isArray(getResponse.body)).toBe(true);

    const putResponse = await request(app)
      .put('/students/19')
      .set('Cookie', `access-token=${accessToken}`)
      .send(updatedStudentData)
    expect(putResponse.statusCode).toEqual(204);

    const putFailResponse = await request(app)
    .put('/students/999')
    .set('Cookie', `access-token=${accessToken}`)
    .send(updatedStudentData)
  expect(putFailResponse.statusCode).toEqual(400);

    const deleteResponse = await request(app)
      .delete('/students/30')
      .set('Cookie', `access-token=${accessToken}`)
    expect(deleteResponse.statusCode).toEqual(204);

    const deleteFailResponse = await request(app)
      .delete('/students/9999')
      .set('Cookie', `access-token=${accessToken}`)
    expect(deleteFailResponse.statusCode).toEqual(400);

    const postResponse = await request(app)
      .post('/students')
      .set('Cookie', `access-token=${accessToken}`)
      .send(newStudentData)
    expect(postResponse.statusCode).toEqual(200);
  });
});


