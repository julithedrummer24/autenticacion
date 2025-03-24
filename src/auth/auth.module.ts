import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { EmailService } from '../config/email/email.service';

@Module({
    imports: [
        UserModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET || 'secretKey', // Usa una clave segura en producción
            signOptions: { expiresIn: '1h' },
        }),
    ],
    providers: [AuthService, EmailService],
    controllers: [AuthController],
})
export class AuthModule {}