import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Notification } from './entities/notification.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationsRepository: Repository<Notification>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
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

  async newNotification(
    id: string,
    createNotificationDto: CreateNotificationDto,
  ) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) throw new NotFoundException('Usuario no encontrado');

    const notification = this.notificationsRepository.create(
      createNotificationDto,
    );

    notification.user = user;

    return await this.notificationsRepository.save(notification);
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
