import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Notification } from './entities/notification.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationsRepository: Repository<Notification>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly mailService: MailService,
  ) {}
  async getNotifications(page: number, limit: number) {
    const notifications = await this.notificationsRepository.find({
      relations: { user: true },
    });

    const start = (page - 1) * limit;
    const end = start + limit;

    return notifications.slice(start, end);
  }

  async getNotificationById(id: string) {
    const notification = await this.notificationsRepository.find({
      where: { id },
      relations: { user: true },
    });
    if (!notification)
      throw new NotFoundException('Notificación no encontrada');

    return notification;
  }

  async newNotification(email: string, template: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      relations: ['post', 'rentals'],
    });

    if (!user) throw new NotFoundException('Usuario no encontrado');

    await this.mailService.sendEmail(user, template);

    const notification = this.notificationsRepository.create({
      template_message: template,
    });

    notification.user = user;

    return await this.notificationsRepository.save(notification);
  }

  async sendNotifications(template: string) {
    const users = await this.userRepository.find();
    const tamañoLote = 5;
    const delay = 5 * 60 * 1000;

    for (let i = 0; i < users.length; i += tamañoLote) {
      const lote = users.slice(i, i + tamañoLote);

      for (const user of lote) {
        if (user) await this.mailService.sendEmail(user, template);
        console.log('Lote enviado');
      }

      if (i + tamañoLote < users.length) {
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }

  async updateNotification(
    id: string,
    updateNotificationDto: UpdateNotificationDto,
  ) {
    await this.notificationsRepository.update(id, updateNotificationDto);
    const notification = await this.notificationsRepository.findOneBy({ id });

    if (!notification)
      throw new NotFoundException('Notificación no encontrada');

    return notification;
  }

  async deleteNotification(id: string) {
    const notification = this.notificationsRepository.findOneBy({ id });

    if (!notification)
      throw new NotFoundException('Notificación no encontrada');

    await this.notificationsRepository.delete({ id });

    return notification;
  }
}
