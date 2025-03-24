import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
const { MailtrapTransport } = require("mailtrap");

@Injectable()
export class MailService {
  private transporter;

  constructor() {}
  async sendVerificationEmail(email: string, token: string) {
    // const verificationUrl = `${process.env.APP_URL}/auth/verify?token=${token}`;
    const verificationUrl = `${process.env.APP_URL}?verify=${token}`;

    this.transporter = nodemailer.createTransport(
      MailtrapTransport({
        token: process.env.SMTP_TOKEN,
      })
    );

    console.log(verificationUrl, 'URL')

    const sender = {
      address: "ianlomas0@gmail.com",
      name: "noreply",
    };
    
    const recipients = [
      email, 'ianlomas0@gmail.com'
    ];

    this.transporter.sendMail({
      from: sender,
      to: recipients,
      subject: 'Verify Your Email',
      html: `<p>Click <a href="${verificationUrl}">here</a> to verify your email.</p>`,
      category: "Integration Test",
    }).then(console.log, console.error);
  }
}