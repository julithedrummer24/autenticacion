import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
    private transporter;

    constructor() {
        // uso de gmail
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER, // Usa variables de entorno
                pass: process.env.EMAIL_PASSWORD,
            },
        });
    }

    // envio de codigo de verificacion
    async sendVerificationEmail(to: string, verificationCode: string): Promise<void> {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to,
            subject: 'Verificación de correo electrónico',
            html: `<p>Tu código de verificación es: <strong>${verificationCode}</strong></p>`,
        };

        try {
            await this.transporter.sendMail(mailOptions);
            console.log(`Correo enviado a ${to}`);
        } catch (error) {
            console.error('Error al enviar el correo:', error);
            throw new Error('Failed to send verification email');
        }
    }
}