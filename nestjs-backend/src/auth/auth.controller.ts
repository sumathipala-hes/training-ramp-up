/* eslint-disable prettier/prettier */
import { Controller, Get, HttpStatus, Req, Res } from "@nestjs/common";
import { Response, Request } from 'express';
import { AuthService } from "./auth.service";

@Controller()
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Get('userAuth')
    async userAuthenticated(
    @Res() res: Response,
    @Req() req: Request) {
        try {
            await this.authService.authenticatedUser(req);
            res.json('User is Authenticated');
        } catch (error) {
            return res.status(401).json({ message: error.message });
        }
    }

    @Get('refresh')
    async refreshedAuthentication(
    @Res() res: Response,
    @Req() req: Request) {
        try {
            const token = await this.authService.getNewAccessToken(req);
            res.cookie('access-token', token.accessToken, { httpOnly: true, maxAge: 60 * 60 * 1000 });
            res.status(HttpStatus.OK).json({ message: 'User is Authenticated'});
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
        } 
    }
}