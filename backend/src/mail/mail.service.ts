import { MailerService } from '@nestjs-modules/mailer';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private readonly mailerservice: MailerService) {}
  async sendEmail(email: string, template: string) {
    console.log(template);

    try {
      await this.mailerservice.sendMail({
        to: email,
        subject: 'You Drive. Alquila Autos Facilmente',
        template: template,
        attachments: [
          {
            filename: 'logo.png',
            path: __dirname + '../../../../frontend/public/logo.png',
            cid: 'imagename',
          },
        ],
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
