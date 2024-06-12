import { MailerService } from '@nestjs-modules/mailer';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rental } from 'src/rentals/entities/rental.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerservice: MailerService,
    @InjectRepository(Rental) private rentalsRepository: Repository<Rental>,
  ) {}
  async sendEmail(user, template: string, contractPost?: any) {
    if (template === 'welcome') {
      try {
        await this.mailerservice.sendMail({
          to: user.email,
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
          to: user.email,
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
    } else if (template === 'payConstancy') {
      //Para price buscar
      const posts = user.post.filter((post) => ({ price: post.price }));      
      const price = posts[0].price;

      const datePay = user.rentals.filter((post) => ({
        createdAt: post.createdAt,
      }));
      const DatePay = datePay[datePay.length - 1].createdAt;

      const rentalsStart = user.rentals.filter((post) => ({
        rentalStartDate: post.rentalStartDate,
      }));
      const RENTALStart = rentalsStart[rentalsStart.length - 1].rentalStartDate;

      const datePayEnd = user.rentals.filter((post) => ({
        rentalEndDate: post.rentalEndDate,
      }));
      const DatePayend = datePayEnd[datePayEnd.length - 1].rentalEndDate;

      const numOperation = user.rentals.filter((post) => ({ id: post.id }));
      const NumOperation = numOperation[numOperation.length - 1].id;

      try {
        await this.mailerservice.sendMail({
          to: user.email,
          subject: 'You Drive. Alquila Autos Facilmente',
          template: 'payConstancy',
          context: {
            username: user.name,
            prueba: user.password,
            price: price,
            newDayPay: DatePay,
            newRentalsStart: RENTALStart,
            newRentalsEnd: DatePayend,
            newNumOperation: NumOperation,
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
    } else if (template === 'rentedVehicle') {
      const rental = await this.rentalsRepository.find({
        where: { posts: { id: contractPost.id } },
        relations: { users: true },
      });

      try {
        await this.mailerservice.sendMail({
          to: user.email,
          subject: 'You Drive. Alquila Autos Facilmente',
          template: 'rentedVehicle',
          context: {
            owner: user.name,
            renter: rental[0]?.users[0].name,
            post: contractPost.title,
            description: contractPost.description,
            price: contractPost.price,
            rentalStart: rental[0]?.rentalStartDate,
            rentalEnd: rental[0]?.rentalEndDate,
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
      const posts = user.post?.length
        ? user.post.map((post) => ({
            title: post.title,
            description: post.description,
          }))
        : [{ title: '', description: 'Aún no has publicado nada' }];

      const rentals = user.rentals?.length
        ? user.rentals.map((rentals) => ({
            rentalStartDate: rentals.rentalStartDate,
            rentalEndDate: rentals.rentalEndDate,
          }))
        : [{ rentalStartDate: 'Aún no has alquilado nada', rentalEndDate: '' }];

      try {
        await this.mailerservice.sendMail({
          to: user.email,
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
            {
              filename: 'offer.png',
              path: __dirname + '../../../../frontend/public/bestpriceform.png',
              cid: 'weeklyoffer',
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
