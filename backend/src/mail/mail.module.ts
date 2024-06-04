import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailerConfig } from 'src/config/config.mailer';

@Module({
  imports: [MailerModule.forRoot(MailerConfig)],
  providers: [MailService],
  exports: [MailModule],
})
export class MailModule {}
