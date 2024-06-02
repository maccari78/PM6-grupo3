import { MailerService } from '@nestjs-modules/mailer';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private readonly mailerservice: MailerService) {}
  async sendEmail() {
    try {
      await this.mailerservice.sendMail({
        to: 'turretedapple@gmail.com',
        subject: 'You Drive. Alquila Autos Facilmente',
        date: '1/23/2000',
        text: 'ESTE ES UN CORREO DE PRUEBA ENVIADO DESDE LA APLICACIÓN DE YOU DRIVE.',
        html: '<p>Este es un correo de ejemplo enviado desde la aplicación You Drive en formato html<p>',
      });
      return { message: 'Correo enviado exitosamente' };
    } catch (error) {
      console.error(error);
      throw new BadRequestException(
        'El correo no pudo ser enviado exitosamente',
      );
    }
  }
}
