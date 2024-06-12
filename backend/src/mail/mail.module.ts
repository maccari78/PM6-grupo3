import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailerConfig } from 'src/config/config.mailer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rental } from 'src/rentals/entities/rental.entity';

@Module({
  imports: [
    MailerModule.forRoot(MailerConfig),
    TypeOrmModule.forFeature([Rental]),
  ],
  providers: [MailService],
  exports: [MailModule],
})
export class MailModule {}
