/* eslint-disable prettier/prettier */
import { Test, TestingModule } from "@nestjs/testing";
import { UserService } from "./user.service";
import { RegisterDto } from "./dto/register.dto";
import { JwtService } from "@nestjs/jwt";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { getRepositoryToken } from "@nestjs/typeorm";
import * as bcrypt from 'bcryptjs';
import { LoginDto } from "./dto/login.dto";
import { Request } from "express";

const mockUserRepository = {
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
};

const mockJwtService = {
    sign: jest.fn(),
    decode: jest.fn(),
}

describe('UserService', () => {
    let userService: UserService;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let userRepository: Repository<User>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserService,
                {
                    provide: getRepositoryToken(User),
                    useValue: mockUserRepository,
                },
                {
                    provide: JwtService,
                    useValue: mockJwtService,
                },
            ],
        }).compile();

        userService = module.get<UserService>(UserService);
        userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    });

    it('should be defined', () => {
        expect(userService).toBeDefined();
    });

    describe('register', () => {
        it('should register a new user', async() => {
            const registerDto: RegisterDto = {
                username: 'mockadmin@mock.com',
                password: 'mockpassword',
                role: 'admin'
            };

            const hash = await bcrypt.hash(registerDto.password, 10);
            const user = new User();
            user.username = registerDto.username;
            user.password = hash;
            user.role = registerDto.role;
            user.id = 1;

            mockUserRepository.findOne.mockResolvedValue(null);
            mockUserRepository.create.mockReturnValue(user);
            mockUserRepository.save.mockResolvedValue(user);

            mockJwtService.sign.mockReturnValue('access-token');

            const result = await userService.register(registerDto);

            expect(result).toEqual({
                accessToken: 'access-token',
                refreshToken: expect.any(String),
            });
            expect(mockUserRepository.findOne).toHaveBeenCalledWith({
                where: { username: registerDto.username },
            });
            expect(mockUserRepository.create).toHaveBeenCalledWith({
                username: registerDto.username,
                password: expect.any(String),
                role: registerDto.role,
            });
            expect(mockUserRepository.save).toHaveBeenCalledWith(user);
            expect(mockJwtService.sign).toHaveBeenCalledWith(
                {
                    username: registerDto.username,
                    id: 1,
                    role: registerDto.role,
                },
                {
                    secret: process.env.JWT_SECRET as string,
                    expiresIn: '60m',
                }
            );
        });
        it('should throw an error if user already exists', async() => {
            const registerDto: RegisterDto = {
                username: 'mockadmin@mock.com',
                password: 'mockpassword',
                role: 'admin'
            };
            mockUserRepository.findOne.mockResolvedValue({
                username: 'mockadmin@mock.com',
            });
            await expect(userService.register(registerDto)).rejects.toThrow(
                'User already exists'
            )
        })
    });

    describe('login', () => {
        it('should log in an existing user', async() => {
            const loginDto: LoginDto = {
                username: 'mockadmin@mock.com',
                password: 'mockpassword',
            };
            const hashedPassword = await bcrypt.hash(loginDto.password, 10);
            const existingUser = {
                username: loginDto.username,
                password: hashedPassword,
                role: 'admin',
                id: 1,
            }
            mockUserRepository.findOne.mockResolvedValue(existingUser);
            mockJwtService.sign.mockReturnValue('access-token');
            const result = await userService.login(loginDto);

            expect(result).toEqual({
                accessToken: 'access-token',
                refreshToken: expect.any(String),
            });
            expect(mockUserRepository.findOne).toHaveBeenCalledWith({
                where: { username: loginDto.username },
            });
            expect(mockJwtService.sign).toHaveBeenCalledWith(
                {
                    username: loginDto.username,
                    id: 1,
                    role: existingUser.role,
                },
                {
                    secret: process.env.JWT_SECRET as string,
                    expiresIn: '60m',
                }
            );

        });
        it('should throw an error if username does not exist', async() => {
            const loginDto: LoginDto = {
                username: 'mockadmin@mock.com',
                password: 'incorrectpassword',
            };
            mockUserRepository.findOne.mockResolvedValue(null);
            await expect(userService.login(loginDto)).rejects.toThrow(
                'The email address entered is not connected to an account'
            );
        });
        it('should throw an error if password is incorrect', async() => {
            const loginDto: LoginDto = {
                username: 'mockadmin@mock.com',
                password: 'incorrectpassword',
            };
            const hashedPassword = await bcrypt.hash('mockpassword', 10);
            const existingUser = {
                username: loginDto.username,
                password: hashedPassword,
            };

            mockUserRepository.findOne.mockResolvedValue(existingUser);
            await expect(userService.login(loginDto)).rejects.toThrow(
                'Wrong Username and Password Combination'
            );
        });
    });
    describe('getUserRole', () => {
        it('should return user role when a valid access token is provided', async() => {
            const accessToken = 'valid-access-token'
            const expectedUserRole = 'admin';
            const decodedToken = { role: expectedUserRole };

            const req: Request = { 
                cookies: { 
                    'access-token': accessToken,
                },
            } as Request;

            mockJwtService.decode.mockReturnValue(decodedToken);
            const userRole = await userService.getUserRole(req);

            expect(userRole).toEqual(expectedUserRole);
            expect(mockJwtService.decode).toHaveBeenCalledWith(accessToken);
        });
        it('should throw an error if no access token is provided', async() => {
            const req: Request = {
                cookies: {},
            } as Request;
            await expect(userService.getUserRole(req)).rejects.toThrow(
                'User is not logged in. Cannot fetch the role.'
            );
        });
    });
});