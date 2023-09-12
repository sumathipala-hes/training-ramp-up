/* eslint-disable prettier/prettier */
import { Body, Controller, Get, HttpStatus, Post, Req, Res } from "@nestjs/common";
import { UserService } from "./user.service";
import { Response, Request } from 'express';
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";

@Controller()
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('register')
    async register(
        @Body() registerDto: RegisterDto,
        @Res() res: Response) {
            try {
                const tokens = await this.userService.register(registerDto);
                res.cookie('access-token', tokens.accessToken, { httpOnly: true, maxAge: 60 * 60 * 1000 });
                res.cookie('refresh-token', tokens.refreshToken, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 });
                res.status(HttpStatus.CREATED).json({ message: 'USER REGISTERED' });
            } catch (err) {
                if (err instanceof Error) {
                    return res.status(HttpStatus.BAD_REQUEST).json({ message: err.message });
                }
            }
        }

    @Post('login')
    async login(
        @Body() loginDto: LoginDto,
        @Res() res: Response) {
            try {
                const tokens = await this.userService.login(loginDto);
                res.cookie('access-token', tokens.accessToken, { httpOnly: true, maxAge: 60 * 60 * 1000 });
                res.cookie('refresh-token', tokens.refreshToken, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 });
                res.json({ message: 'USER LOGGED IN' });
            } catch (err) {
                if (err instanceof Error) {
                    return res.status(HttpStatus.BAD_REQUEST).json({ message: err.message });
                }
            }
        }
    
    @Post('logout')
    async logout(
        @Res() res: Response) {
            try {
                res.clearCookie('access-token');
                res.clearCookie('refresh-token');
                res.json({ message: 'LOGGED OUT' })
            } catch (err) {
                if (err instanceof Error) {
                    return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Logout failed' });
                }
            }
        }
    
    @Get('userAuth')
    async userAuthenticated(
        @Res() res: Response) {
            res.json('User is Authenticated');
        }

    @Get('refresh')
    async refreshedAuthentication(
        @Res() res: Response) {
            res.json('User is Authenticated. Refreshed');
        }
        
    @Get('user')
    async getUserRole(
        @Req() req: Request,
        @Res() res: Response) {
            try {
                const userRole = await this.userService.getUserRole(req);
                res.json({ role: userRole });
            } catch (err) {
                if (err instanceof Error) {
                    return res.status(HttpStatus.BAD_REQUEST).json({ message: err.message });
                }
            }
        }
}