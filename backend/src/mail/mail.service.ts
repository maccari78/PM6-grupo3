import { MailerService } from '@nestjs-modules/mailer';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notification } from 'src/notifications/entities/notification.entity';
import { Rental } from 'src/rentals/entities/rental.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerservice: MailerService,
    @InjectRepository(Rental) private rentalsRepository: Repository<Rental>,
    @InjectRepository(Notification)
    private notificationsRepository: Repository<Notification>,
  ) {}
  async sendEmail(user, template: string, contractPost?: any) {
    switch (template) {
      case 'welcome':
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
                path: 'https://res.cloudinary.com/dkent00db/image/upload/v1718734167/logo_u94niq.png',
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

      case 'offer':
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
                path: 'https://res.cloudinary.com/dkent00db/image/upload/v1718734167/logo_u94niq.png',
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

      case 'payConstancy': {
        //To search totalCost
        const PRICE = user.rentals.filter((post) => ({
          priceTotal: post.totalCost,
        }));
        const price = PRICE[PRICE.length - 1].totalCost;

        //To search payDay
        const datePay = user.rentals.filter((post) => ({
          createdAt: post.createdAt,
        }));
        const DatePay = datePay[datePay.length - 1].createdAt;

        //To search for first day of rent
        const rentalsStart = user.rentals.filter((post) => ({
          rentalStartDate: post.rentalStartDate,
        }));
        const RENTALStart =
          rentalsStart[rentalsStart.length - 1].rentalStartDate;

        //To search for last day of rent
        const datePayEnd = user.rentals.filter((post) => ({
          rentalEndDate: post.rentalEndDate,
        }));
        const DatePayend = datePayEnd[datePayEnd.length - 1].rentalEndDate;

        //To search for number of operation
        const numOperation = user.rentals.filter((post) => ({ id: post.id }));
        const NumOperation = numOperation[numOperation.length - 1].id;

        try {
          await this.mailerservice.sendMail({
            to: user.email,
            subject: 'You Drive. Alquila Autos Facilmente',
            template: 'payConstancy',
            context: {
              username: user.name,
              price: price,
              newDayPay: DatePay,
              newRentalsStart: RENTALStart,
              newRentalsEnd: DatePayend,
              newNumOperation: NumOperation,
            },
            attachments: [
              {
                filename: 'logo.png',
                path: 'https://res.cloudinary.com/dkent00db/image/upload/v1718734167/logo_u94niq.png',
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

      case 'canceled': {
        const rental = await this.rentalsRepository.find({
          where: { posts: { id: contractPost.id } },
          relations: { users: true },
        });

        const PRICE = user.rentals.filter((post) => ({
          priceTotal: post.totalCost,
        }));
        const price = PRICE[PRICE.length - 1].totalCost;

        // console.log('Contrato como llega:', contractPost);

        // console.log('rental:', rental);

        // console.log('Este es el owner', user.name);

        try {
          await this.mailerservice.sendMail({
            to: user.email,
            subject: 'You Drive. Alquila Autos Facilmente',
            template: 'cancelOwner',
            context: {
              owner: user.name,
              renter: contractPost.rentals[0].users[0].name,
              post: contractPost.title,
              description: contractPost.description,
              prices: price,
              rentalStart: rental[0]?.rentalStartDate,
              rentalEnd: rental[0]?.rentalEndDate,
            },
            attachments: [
              {
                filename: 'logo.png',
                path: 'https://res.cloudinary.com/dkent00db/image/upload/v1718734167/logo_u94niq.png',
                cid: 'imagename',
              },
            ],
          });

          await this.mailerservice.sendMail({
            to: contractPost.rentals[0].users[0].email,
            subject: 'You Drive. Alquila Autos Facilmente',
            template: 'cancelRenter',
            context: {
              owner: user.name,
              renter: contractPost.rentals[0].users[0].name,
              post: contractPost.title,
              description: contractPost.description,
              prices: price,
              rentalStart: rental[0]?.rentalStartDate,
              rentalEnd: rental[0]?.rentalEndDate,
            },
            attachments: [
              {
                filename: 'logo.png',
                path: 'https://res.cloudinary.com/dkent00db/image/upload/v1718734167/logo_u94niq.png',
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

      case 'rentedVehicle': {
        const rental = await this.rentalsRepository.find({
          where: { posts: { id: contractPost.id } },
          relations: { users: true },
        });

        //To search totalCost
        const PRICE = user.rentals.filter((post) => ({
          priceTotal: post.totalCost,
        }));
        const price = PRICE[PRICE.length - 1].totalCost;

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
              prices: price,
              rentalStart: rental[0]?.rentalStartDate,
              rentalEnd: rental[0]?.rentalEndDate,
            },
            attachments: [
              {
                filename: 'logo.png',
                path: 'https://res.cloudinary.com/dkent00db/image/upload/v1718734167/logo_u94niq.png',
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

      case 'weekly':
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
          : [
              {
                rentalStartDate: 'Aún no has alquilado nada',
                rentalEndDate: '',
              },
            ];

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
                path: 'https://res.cloudinary.com/dkent00db/image/upload/v1718734167/logo_u94niq.png',
                cid: 'imagename',
              },
              {
                filename: 'offer.png',
                path: 'https://res.cloudinary.com/dkent00db/image/upload/v1718734167/bestpriceform_ocsnkq.png',
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

      case 'newChat':
        try {
          await this.mailerservice.sendMail({
            to: user.email,
            subject: 'You Drive. Alquila Autos Facilmente',
            template: 'newChat',
            context: {
              username: user.name,
              posts: posts,
              rentals: rentals,
            },
            attachments: [
              {
                filename: 'logo.png',
                path: 'https://res.cloudinary.com/dkent00db/image/upload/v1718734167/logo_u94niq.png',
                cid: 'imagename',
              },
              {
                filename: 'offer.png',
                path: 'https://res.cloudinary.com/dkent00db/image/upload/v1718734167/bestpriceform_ocsnkq.png',
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

  async newChat(sender, receiver) {
    function encontrarNotificacionMasReciente(notifications, templateMessage) {
      // Filtrar las notificaciones por el tipo deseado
      const notificacionesFiltradas = notifications.filter(
        (notification) => notification.template_message === templateMessage,
      );

      // Si no hay notificaciones de ese tipo, regresar null
      if (notificacionesFiltradas.length === 0) {
        return null;
      }

      // Encontrar la notificación más reciente
      return notificacionesFiltradas.reduce(
        (notificacionMasReciente, currentNotification) => {
          return new Date(currentNotification.createdAt) >
            new Date(notificacionMasReciente.createdAt)
            ? currentNotification
            : notificacionMasReciente;
        },
      );
    }

    if (receiver.notifications) {
      const found = encontrarNotificacionMasReciente(
        receiver.notifications,
        'newChat',
      );

      if (!found) {
        try {
          await this.mailerservice.sendMail({
            to: receiver.email,
            subject: 'You Drive. Alquila Autos Facilmente',
            template: 'newChat',
            context: {
              receiver: receiver.name,
              sender: sender.name,
            },
            attachments: [
              {
                filename: 'logo.png',
                path: 'https://res.cloudinary.com/dkent00db/image/upload/v1718734167/logo_u94niq.png',
                cid: 'imagename',
              },
            ],
          });

          const notification = this.notificationsRepository.create({
            template_message: 'newChat',
          });

          notification.user = receiver;

          await this.notificationsRepository.save(notification);

          return { message: 'Correo enviado exitosamente' };
        } catch (error) {
          console.error(error);
          throw new BadRequestException(
            'El correo no pudo ser enviado exitosamente',
          );
        }
      } else {
        return { message: 'Notificación ya enviada' };
      }
    } else {
      try {
        await this.mailerservice.sendMail({
          to: receiver.email,
          subject: 'You Drive. Alquila Autos Facilmente',
          template: 'newChat',
          context: {
            receiver: receiver.name,
            sender: sender.name,
          },
          attachments: [
            {
              filename: 'logo.png',
              path: 'https://res.cloudinary.com/dkent00db/image/upload/v1718734167/logo_u94niq.png',
              cid: 'imagename',
            },
          ],
        });

        const notification = this.notificationsRepository.create({
          template_message: 'newChat',
        });

        notification.user = receiver;

        await this.notificationsRepository.save(notification);

        return { message: 'Correo enviado exitosamente' };
      } catch (error) {
        console.error(error);
        throw new BadRequestException(
          'El correo no pudo ser enviado exitosamente',
        );
      }
    }
  }
  async contactDevs(formData) {
    try {
      await this.mailerservice.sendMail({
        to: 'proyectofinal.g3.henry@gmail.com',
        subject: 'Contacto desde la web de You Drive',
        template: 'contact',
        context: {
          sender: formData.name,
          message: formData.message,
          email: formData.email,
        },
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
