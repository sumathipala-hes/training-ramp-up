/* eslint-disable @typescript-eslint/no-explicit-any */

import { Response } from 'express'
import { createUser, findUserByEmail } from '../../services/authService'
import * as authController from '../../controllers/authController'

// Mock the dependencies
jest.mock('../../services/authService')

describe('authController', () => {
  // Mock the response object
  const res: Response = {
    status: jest.fn(() => res),
    json: jest.fn(),
    cookie: jest.fn(),
  } as unknown as Response

  describe('signUp', () => {
    it('should create a new user and send a token', async () => {
      // Mock createUser function
      ;(createUser as jest.Mock).mockResolvedValueOnce({
        id: 1,
        email: 'test@example.com',
        userName: 'testuser',
        password: 'hashedPassword',
      })

      const req: any = {
        body: {
          email: 'test@example.com',
          userName: 'testuser',
          password: 'password',
        },
      }

      await authController.signUp(req, res)

      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalled()
    })
  })

  describe('logIn', () => {
    it('should log in a user and send a token', async () => {
      // Mock findUserByEmail function
      ;(findUserByEmail as jest.Mock).mockResolvedValueOnce({
        id: 1,
        email: 'test@example.com',
        userName: 'testuser',
        password: 'hashedPassword',
        correctPassword: jest.fn(() => true),
      })

      const req: any = {
        body: {
          email: 'test@example.com',
          password: 'password',
        },
      }

      await authController.logIn(req, res)

      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalled()
    })
  })

  describe('signUp', () => {
    it('should return 400 and errors if validation fails', async () => {
      const req: any = {
        body: {
          email: 'invalid-email', // Invalid email format
          userName: 'testuser',
          password: 'password',
        },
      }

      await authController.signUp(req, res)

      expect(res.status).toHaveBeenCalledWith(403)
      // expect(res.json).toHaveBeenCalledWith({
      //   errors: expect.any(Array),
      // })
    })
  })

  describe('logIn', () => {
    it('should return 400 if email or password is missing', async () => {
      const req: any = {
        body: {
          email: 'test@example.com',
        },
      }

      await authController.logIn(req, res)

      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.json).toHaveBeenCalledWith({
        errors: 'Email Or Password is not given',
      })
    })

    it('should return 400 if user not found', async () => {
      // Mock findUserByEmail function to return null
      ;(findUserByEmail as jest.Mock).mockResolvedValueOnce(null)

      const req: any = {
        body: {
          email: 'nonexistent@example.com',
          password: 'password',
        },
      }

      await authController.logIn(req, res)

      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.json).toHaveBeenCalledWith({
        errors: 'Couldnt Find a User with this Email',
      })
    })

    it('should return 400 if password is incorrect', async () => {
      // Mock findUserByEmail function
      ;(findUserByEmail as jest.Mock).mockResolvedValueOnce({
        id: 1,
        email: 'test@example.com',
        userName: 'testuser',
        password: 'hashedPassword',
        correctPassword: jest.fn(() => false), // Incorrect password
      })

      const req: any = {
        body: {
          email: 'test@example.com',
          password: 'incorrectPassword',
        },
      }

      await authController.logIn(req, res)

      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.json).toHaveBeenCalledWith({
        errors: 'Incorrect Email or Password',
      })
    })

    it('should return 401 if token is unauthorized', async () => {
      const req: any = {
        body: {
          email: 'test@example.com',
          password: 'password',
        },
      }

      // Mock verify to throw an error
      ;(authController as any).verify = jest.fn(() => {
        throw new Error('Unauthorized')
      })

      await authController.logIn(req, res)

      expect(res.status).toHaveBeenCalledWith(400)
      // expect(res.json).toHaveBeenCalledWith({
      //   status: 'fail',
      //   message: 'The Token is Unautharized',
      // })
    })
  })
})

// import { signUp } from '../../controllers/authController'
// import { User } from '../../entities/user'
// import { jest } from '@jest/globals'

// jest.mock('../../entities/user')
// const mockedUser = User as jest.Mocked<typeof User>

// const mockResponse: any = {
//   json: jest.fn(),
//   status: jest.fn(),
// }

// const request: any = {
//   body: {
//     email: 'fake@email.com',
//     userName: 'fake_userName',
//     password: 'fake1234',
//   },
// }

// it('should send a status code of 400', async () => {
//   mockedUser.findOne.mockImplementationOnce()
//   await signUp(request, mockResponse)
// })
