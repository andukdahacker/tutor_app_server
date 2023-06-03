import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Mailgun, { MailgunMessageData } from 'mailgun.js';
import { IMailgunClient } from 'mailgun.js/Interfaces';

@Injectable()
export class MailerService {
  private mailClient: IMailgunClient;
  private mailDomain: string;
  private address =
    '<mailgun@sandbox25eb4bcd7a094f61a3a01e9b33cfa49b.mailgun.org>';
  constructor(private readonly configService: ConfigService) {
    const mg = new Mailgun(FormData);
    this.mailClient = mg.client({
      username: 'api',
      key: configService.get('MAILGUN_PRIVATE_KEY'),
    });

    this.mailDomain = configService.get('MAILGUN_DOMAIN_NAME');
  }

  async sendMail(messageData: MailgunMessageData) {
    const { from, ...data } = messageData;
    try {
      return await this.mailClient.messages.create(this.mailDomain, {
        from: `${from} ${this.address}`,
        ...data,
      });
    } catch (error) {
      console.log(error);
    }
  }
}
