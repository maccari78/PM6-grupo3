import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/users/utils/roles.guard';
import { Role } from 'src/users/utils/roles.enum';
import { Roles } from 'src/users/utils/roles.decorator';

@ApiTags('NOTIFICATIONS')
@Controller('notifications')
@UseGuards(RolesGuard)
// @Roles(Role.Admin)
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) { }

  @Get()
  getNotifications(
    @Param('page') page: number = 1,
    @Param('limit') limit: number = 10,
  ) {
    return this.notificationsService.getNotifications(page, limit);
  }

  @Get(':id')
  getNotificationById(@Param('id') id: string) {
    return this.notificationsService.getNotificationById(id);
  }

  @Post()
  newNotification(@Body() createNotificationDto: CreateNotificationDto) {
    const { email, template_message } = createNotificationDto;
    return this.notificationsService.newNotification(email, template_message);
  }

  @Put(':id')
  updateNotification(
    @Param('id') id: string,
    @Body() updateNotificationDto: UpdateNotificationDto,
  ) {
    return this.notificationsService.updateNotification(
      id,
      updateNotificationDto,
    );
  }

  @Delete(':id')
  deleteNotification(@Param('id') id: string) {
    return this.notificationsService.deleteNotification(id);
  }

}
