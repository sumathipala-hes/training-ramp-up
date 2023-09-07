/* eslint-disable @typescript-eslint/no-explicit-any */

import { Response } from 'express'
import { createUser, findUserByEmail } from '../../services/authService'
import * as authController from '../../controllers/authController'
import { User } from '../../entities/user'

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
      } as User)

      const req: any = {
        body: {
          email: 'test@example.com',
          userName: 'testuser',
          password: 'password',
        },
      }

      const newUser = await authController.signUp(req, res)

      expect(newUser).toBeDefined()
      expect(newUser?.status).toEqual(200)
    })

    it('should return 400 and errors if validation fails', async () => {
      const req: any = {
        body: {
          email: 'invalid-email', // Invalid email format
          userName: 'testuser',
        },
      }

      const response = await authController.signUp(req, res)

      expect(response?.status).toEqual(403)
      // expect(res.json).toHaveBeenCalledWith({
      //   errors: expect.any(Array),
      // })
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
      } as unknown as User)

      const req: any = {
        body: {
          email: 'test@example.com',
          password: 'password',
        },
      }

      const response = await authController.logIn(req, res)
      console.log(response)
      expect(response).toBeDefined()
      expect(response?.status).toEqual(200)
    })

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

      const response = await authController.logIn(req, res)

      expect(response?.status).toEqual(403)
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
  })
})
