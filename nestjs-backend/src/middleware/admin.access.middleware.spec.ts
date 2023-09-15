/* eslint-disable prettier/prettier */

import { Test, TestingModule } from "@nestjs/testing";
import { AdminAccess } from "./admin.access.middleware";
import { Request, Response, NextFunction } from 'express';
import { JwtService } from "@nestjs/jwt";
import { JwtPayload } from 'jsonwebtoken';

const mockResponse = {
    status: jest.fn(() => mockResponse),
    json: jest.fn(),
} as unknown as Response;

const mockNext = jest.fn() as NextFunction; 

describe('AuthMiddleware', () => {
    let adminAccess: AdminAccess;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AdminAccess, JwtService],
        }).compile();

        adminAccess = module.get<AdminAccess>(AdminAccess);
    });

    it('should be defined', () => {
        expect(adminAccess).toBeDefined();
    });

    it('should call next() when a valid access token  with role "admin" is provided', () => {
        const decodedToken: JwtPayload = {
            role: 'admin',
        };
        
        const mockRequest: Partial<Request> = { cookies:{ 'access-token': 'validAccessToken' }};

        jest.spyOn(adminAccess['jwtService'], 'decode').mockReturnValue(decodedToken);
        adminAccess.use(mockRequest as Request, mockResponse as Response, mockNext);

        expect(mockNext).toHaveBeenCalled();
    });

    it('should throw an error when a valid access token with role "user" is provided', () => {
        const decodedToken: JwtPayload = {
            role: 'user',
        };

        const mockRequest: Partial<Request> = { cookies:{ 'access-token': 'validAccessToken' }};

        jest.spyOn(adminAccess['jwtService'], 'decode').mockReturnValue(decodedToken);
        
        adminAccess.use(mockRequest as Request, mockResponse as Response, mockNext);
        expect(mockResponse.status).toHaveBeenCalledWith(401);
        expect(mockResponse.json).toHaveBeenCalledWith({
            auth: false,
            error: 'Access denied'
        })
    });

    it('should throw an error when no access token is provided', () => {
        const mockRequest = { cookies: {} } as any;

        expect(() => adminAccess.use(mockRequest, mockResponse as Response, mockNext))
        .toThrowError('User is not logged in. Cannot fetch the role.');
    });
});