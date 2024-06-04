import { MailerService } from '@nestjs-modules/mailer';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private readonly mailerservice: MailerService) {}
  async sendEmail(user, template: string) {
    if (template === 'welcome') {
      try {
        await this.mailerservice.sendMail({
          to: 'youdrive.notifications@getMaxListeners.com',
          subject: 'You Drive. Alquila Autos Facilmente',
          template: 'welcome',
          context: {
            username: user.name,
          },
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
    } else if (template === 'offer') {
      try {
        await this.mailerservice.sendMail({
          to: 'youdrive.notifications@getMaxListeners.com',
          subject: 'You Drive. Alquila Autos Facilmente',
          template: 'offer',
          context: {
            username: user.name,
          },
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
    } else {
      let posts;
      let rentals;

      user.post[0]
        ? (posts = user.post)
        : (posts = 'Aún no has publicado nada');
      user.rentals[0]
        ? (rentals = user.rentals)
        : (rentals = 'Aún no has alquilado nada');

      try {
        await this.mailerservice.sendMail({
          to: 'youdrive.notifications@getMaxListeners.com',
          subject: 'You Drive. Alquila Autos Facilmente',
          template: 'weekly',
          context: {
            username: user.name,
            posts: posts,
            rentals: rentals,
          },
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
}
