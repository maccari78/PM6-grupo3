import { Injectable } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import cron from 'node-cron';

@Injectable()
export class CronService {
  constructor(private readonly notificationsService: NotificationsService) {
    this.scheduleTasks();
  }

  scheduleTasks() {
    cron.schedule('0 9 * * 1', async () => {
      console.log('Iniciando envio de notificaciones...');
      await this.notificationsService.sendNotifications('offer');
      console.log('Notificaciones enviadas!');
    });
  }
}
