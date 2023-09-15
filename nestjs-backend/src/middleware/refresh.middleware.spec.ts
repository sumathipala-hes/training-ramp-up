/* eslint-disable prettier/prettier */

import { Test, TestingModule } from "@nestjs/testing";
import { RefreshMiddleware } from "./refresh.middleware";
import { Request, Response, NextFunction } from "express";
import { TokenExpiredError } from 'jsonwebtoken';
import * as jwt from 'jsonwebtoken';

const mockResponse = {
    status: jest.fn(() => mockResponse),
    json: jest.fn(),
} as unknown as Response;

const mockNext = jest.fn() as NextFunction; 

describe('RefreshMiddleware', () => {
    let refreshMiddleware: RefreshMiddleware;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [RefreshMiddleware,],
        }).compile();

        refreshMiddleware = module.get<RefreshMiddleware>(RefreshMiddleware);
    });

    it('should be defined', () => {
        expect(refreshMiddleware).toBeDefined();
    });

    it('should return 401 when no access token is provided', () => {
        const mockRequest = {
            cookies: {},
        } as any;

        refreshMiddleware.use(mockRequest, mockResponse as Response, mockNext);

        expect(mockNext).not.toHaveBeenCalled();
        expect(mockResponse.status).toHaveBeenCalledWith(401);
        expect(mockResponse.json).toHaveBeenCalledWith({ 
            auth: false, 
            error : 'User is not Authenticated'
        });
    });

    it('should pass when a valid access token is provided', () => {
        const mockRequest: Request = { 
            cookies: { 
                'refresh-token': 'validRefreshToken'
            },
        } as any;

        const jwtMock = {
            verify: jest.fn(() => true),
        };
        jest.spyOn(jwt, 'verify').mockImplementation(jwtMock.verify);
        refreshMiddleware.use(mockRequest, mockResponse as Response, mockNext);
        expect(mockNext).toHaveBeenCalled();
        jest.restoreAllMocks()
    });

    it('should return 401 when an expired refresh token is provided', () => {
        const mockRequest = {
            cookies: {
                'refresh-token': 'expiredAccessToken',
            },
        } as any;
        const jwtMock = {
            verify: jest.fn(() => {
                throw new TokenExpiredError('', new Date());
            }),
        };
        jest.spyOn(jwt, 'verify').mockImplementation(jwtMock.verify);
        refreshMiddleware.use(mockRequest, mockResponse as Response, mockNext);

        expect(mockResponse.status).toHaveBeenCalledWith(401);
        expect(mockResponse.json).toHaveBeenCalledWith({ 
            auth: false, 
            error : 'Refresh Token has expired'
        });
    });

    it('should return 400 when an error occured other than TokenExpiredError', () => {
        const mockRequest = {
            cookies: {
                'refresh-token': 'invalid-token',
            },
        } as any;
        const jwtMock = {
            verify: jest.fn(() => {
                throw new Error('Invalid token');
            }),
        };
        jest.spyOn(jwt, 'verify').mockImplementation(jwtMock.verify);
        refreshMiddleware.use(mockRequest, mockResponse as Response, mockNext);

        expect(mockResponse.status).toHaveBeenCalledWith(400);
    });
});