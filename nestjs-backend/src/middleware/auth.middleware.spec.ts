/* eslint-disable prettier/prettier */

import { Test, TestingModule } from "@nestjs/testing";
import { AuthMiddleware } from "./auth.middleware";
import { Request, Response, NextFunction } from "express";
import { TokenExpiredError } from 'jsonwebtoken';
import * as jwt from 'jsonwebtoken';

const mockResponse = {
    status: jest.fn(() => mockResponse),
    json: jest.fn(),
} as unknown as Response;

const mockNext = jest.fn() as NextFunction; 

describe('AuthMiddleware', () => {
    let authMiddleware: AuthMiddleware;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AuthMiddleware,],
        }).compile();

        authMiddleware = module.get<AuthMiddleware>(AuthMiddleware);
    });

    it('should be defined', () => {
        expect(authMiddleware).toBeDefined();
    });

    it('should return 401 when no access token is provided', () => {
        const mockRequest = {
            cookies: {},
        } as any;

        authMiddleware.use(mockRequest, mockResponse as Response, mockNext);

        expect(mockNext).not.toHaveBeenCalled();
        expect(mockResponse.status).toHaveBeenCalledWith(401);
        expect(mockResponse.json).toHaveBeenCalledWith({ 
            auth: false, 
            error : 'User is not Authenticated'
        });
    });

    it('should call next() when a valid access token is provided', () => {
        const mockRequest: Partial<Request> = { cookies:{ 'access-token': 'validAccessToken' }};
        const jwtMock = {
            verify: jest.fn(() => true),
        };
        jest.spyOn(jwt, 'verify').mockImplementation(jwtMock.verify);
        authMiddleware.use(mockRequest as Request, mockResponse as Response, mockNext);
        expect(mockNext).toHaveBeenCalled();
        jest.restoreAllMocks();
    });

    it('should return 401 when an expired access token is provided', () => {
        const mockRequest = {
            cookies: {
                'access-token': 'expiredAccessToken',
            },
        } as any;
        const jwtMock = {
            verify: jest.fn(() => {
                throw new TokenExpiredError('', new Date());
            }),
        };
        jest.spyOn(jwt, 'verify').mockImplementation(jwtMock.verify);
        authMiddleware.use(mockRequest, mockResponse as Response, mockNext);

        expect(mockResponse.status).toHaveBeenCalledWith(401);
        expect(mockResponse.json).toHaveBeenCalledWith({ 
            auth: false, 
            error : 'Access Token has expired'
        });
    });

    it('should return 400 when an error occured other than TokenExpiredError', () => {
        const mockRequest = {
            cookies: {
                'access-token': 'invalid-token',
            },
        } as any;
        const jwtMock = {
            verify: jest.fn(() => {
                throw new Error('Invalid token');
            }),
        };
        jest.spyOn(jwt, 'verify').mockImplementation(jwtMock.verify);
        authMiddleware.use(mockRequest, mockResponse as Response, mockNext);

        expect(mockResponse.status).toHaveBeenCalledWith(400);
    });
});