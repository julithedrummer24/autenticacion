import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

    @Post('send-verification')
    async sendVerification(@Body('email') email: string) {
        await this.authService.sendVerificationCode(email);
        return { message: 'Código de verificación enviado' };
    }
}