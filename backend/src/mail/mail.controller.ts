import { Body, Controller, Post } from '@nestjs/common';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('send-email')
  async sendEmail(@Body() email: string, template: string) {
    return this.mailService.sendEmail(email, template);
  }
}
