import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig({ path: '.env.development' });

export const MailerConfig = {
  transport: {
    host: 'smtp.gmail.com', //Servidor SMTP de Gmail
    port: 587, //Puerto para TLS
    secure: false, //False para TLS
    auth: {
      user: process.env.MAILER_AUTH_USER,
      pass: process.env.MAILER_AUTH_PASS,
    },
  },
  defaults: {
    from: '"No Reply" <no.reply@example.com>',
  },
  template: {
    dir: join(__dirname, '..', 'mail', 'templates'),
    adapter: new HandlebarsAdapter(),
    options: {
      strict: true,
    },
  },
};
