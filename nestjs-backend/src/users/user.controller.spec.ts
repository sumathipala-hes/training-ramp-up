/* eslint-disable prettier/prettier */
import { Test, TestingModule } from "@nestjs/testing";
import { UserController } from "./user.controller"
import { UserService } from "./user.service";
import { Response, Request } from 'express';
import { RegisterDto } from "./dto/register.dto";
import { JwtService } from "@nestjs/jwt";
import { getRepositoryToken } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { HttpStatus } from "@nestjs/common";
import { LoginDto } from "./dto/login.dto";

const mockRequest = {
    body: {},
} as unknown as Request;

const mockResponse = {
    status: jest.fn(() => mockResponse),
    json: jest.fn(),
    cookie: jest.fn(),
} as unknown as Response;

describe('UserController', () => {
    let userController: UserController;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let userService: UserService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UserController],
            providers: [
                UserService,
                {
                    provide: getRepositoryToken(User),
                    useValue: mockResponse,
                }, 
                JwtService
            ],
        }).compile();

        userController = module.get<UserController>(UserController);
        userService = module.get<UserService>(UserService);
    });

    it('should be defined', () => {
        expect(userController).toBeDefined();
    });

    describe('register', () => {
        const registerDto: RegisterDto = {
            username: 'mockadmin@mock.com',
            password: 'mockpassword',
            role: 'admin'
        };
        const tokens = {
            accessToken: 'mockAccessToken',
            refreshToken: 'mockRefreshToken',
        };

        it('should register a user', async () => {

            jest.spyOn(userService, 'register').mockResolvedValue(tokens);
                
            await userController.register(registerDto, mockResponse);
            expect(mockResponse.cookie).toHaveBeenCalledWith('access-token', 'mockAccessToken', {
                httpOnly: true,
                maxAge: 60 * 60 * 1000,
            });
            expect(mockResponse.cookie).toHaveBeenCalledWith('refresh-token', 'mockRefreshToken', {
                httpOnly: true,
                maxAge: 30 * 24 * 60 * 60 *1000,
            });
            expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.CREATED);
            expect(mockResponse.json).toHaveBeenCalledWith({ message: 'USER REGISTERED' });
            });

        it('should handle errors when registering a user', async () => {
            jest.spyOn(userService, 'register').mockRejectedValue(new Error('Validation error'));
            await userController.register(registerDto, mockResponse);
            expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
            expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Validation error' });
        });
    });

    describe('login', () => {
        const loginDto: LoginDto = {
            username: 'mockadmin@mock.com',
            password: 'mockpassword'
        };
        const tokens = {
            accessToken: 'mockAccessToken',
            refreshToken: 'mockRefreshToken',
        };

        it('should logged in an existing user', async () => {
            jest.spyOn(userService, 'login').mockResolvedValue(tokens);
            await userController.login(loginDto, mockResponse);

            expect(mockResponse.cookie).toHaveBeenCalledWith('access-token', 'mockAccessToken', {
                httpOnly: true,
                maxAge: 60 * 60 * 1000,
            });
            expect(mockResponse.cookie).toHaveBeenCalledWith('refresh-token', 'mockRefreshToken', {
                httpOnly: true,
                maxAge: 30 * 24 * 60 * 60 *1000,
            });
            
            expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.CREATED);
            expect(mockResponse.json).toHaveBeenCalledWith({ message: 'USER LOGGED IN' });
        });

        it('should handle errors when log in a user', async () => {
            jest.spyOn(userService, 'login').mockRejectedValue(new Error('Validation error'));
            await userController.login(loginDto, mockResponse);
            expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
            expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Validation error' });
        });
    });

    describe('getUserRole', () => {

        it('should get the user role', async() => {
            const role = 'user';
            jest.spyOn(userService, 'getUserRole').mockResolvedValue(role);
            await userController.getUserRole(mockRequest, mockResponse);
            expect(mockResponse.json).toHaveBeenCalledWith({ role: role });
        });

        it('should handle errors when gettng the user role', async () => {
            jest.spyOn(userService, 'getUserRole').mockRejectedValue(new Error('Error fetching user role'));
            await userController.getUserRole(mockRequest, mockResponse);
            expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
            expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Error fetching user role' });
        })
    })
});
