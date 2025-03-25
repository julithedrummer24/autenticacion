import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { EmailService } from '../config/email/email.service';
import { User } from '../user/schemas/user.schema';

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name);

    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly emailService: EmailService,
    ) {}

    async validateUser(email: string, password: string): Promise<Omit<User, 'password'>> {
        try {
            const user = await this.userService.findOneByEmail(email);
            
            if (!user) {
                this.logger.warn(`Intento de login con email no registrado: ${email}`);
                return null;
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            
            if (!isPasswordValid) {
                this.logger.warn(`Intento de login con contraseña incorrecta para el usuario: ${email}`);
                return null;
            }

            const { password: _, ...result } = user.toObject();
            return result;
        } catch (error) {
            this.logger.error(`Error al validar usuario: ${error.message}`);
            throw error;
        }
    }

    async login(loginDto: LoginDto): Promise<{ access_token: string; expires_in: number }> {
        const user = await this.validateUser(loginDto.email, loginDto.password);
        
        if (!user) {
            throw new UnauthorizedException('Credenciales inválidas');
        }

        const payload = { 
            email: user.email, 
            sub: user._id,
            roles: user.roles || ['user'] 
        };

        return {
            access_token: this.jwtService.sign(payload),
            expires_in: 900 // 15 minutos en segundos
        };
    }

    async sendVerificationCode(email: string): Promise<{ message: string }> {
        try {
            const user = await this.userService.findOneByEmail(email);
            
            if (!user) {
                throw new UnauthorizedException('Usuario no encontrado');
            }

            const code = Math.floor(100000 + Math.random() * 900000).toString();
            
            await this.userService.updateVerificationCode(user._id.toString(), code);
            
            await this.emailService.sendVerificationEmail(
                user.email,
                user.fullname || 'Usuario',
                code
            );

            this.logger.log(`Código de verificación enviado a ${email}`);
            
            return { message: 'Código de verificación enviado correctamente' };
        } catch (error) {
            this.logger.error(`Error al enviar código de verificación: ${error.message}`);
            throw error;
        }
    }
}