import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail', 
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async sendVerificationEmail(
    email: string,
    fullname: string,
    code: string,
  ): Promise<void> {
    try {
      await this.transporter.sendMail({
        from: `"Tu Aplicación" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Código de verificación',
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px;">
            <h2>Verificación de cuenta</h2>
            <p>Hola ${fullname},</p>
            <p>Tu código de verificación es:</p>
            <h3 style="background: #f5f5f5; padding: 10px; display: inline-block;">
              ${code}
            </h3>
            <p>Este código expirará en 15 minutos.</p>
          </div>
        `,
      });
    } catch (error) {
      throw new Error(`Error al enviar correo: ${error.message}`);
    }
  }
}