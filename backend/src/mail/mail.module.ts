import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailerConfig } from 'src/config/config.mailer';

@Module({
  imports: [MailerModule.forRoot(MailerConfig)],
  controllers: [MailController],
  providers: [MailService],
  exports: [MailModule],
})
export class MailModule {}
