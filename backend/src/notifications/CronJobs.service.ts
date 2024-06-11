import { Injectable } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import cron from 'node-cron';

@Injectable()
export class CronService {
  constructor(private readonly notificationsService: NotificationsService) {
    this.scheduleTasks();
  }

  scheduleTasks() {
    cron.schedule('41 19 * * 1', async () => {
      console.log('Iniciando envio de notificaciones...');
      await this.notificationsService.sendNotifications('weekly');
      console.log('Notificaciones enviadas!');
    });
  }
}
