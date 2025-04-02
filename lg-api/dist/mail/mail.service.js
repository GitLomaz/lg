"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailService = void 0;
const common_1 = require("@nestjs/common");
const nodemailer = require("nodemailer");
const { MailtrapTransport } = require("mailtrap");
let MailService = class MailService {
    constructor() { }
    async sendVerificationEmail(email, token) {
        const verificationUrl = `${process.env.API_APP_URL}?verify=${token}`;
        this.transporter = nodemailer.createTransport(MailtrapTransport({
            token: process.env.SMTP_TOKEN,
        }));
        console.log(verificationUrl, 'URL');
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
};
exports.MailService = MailService;
exports.MailService = MailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], MailService);
//# sourceMappingURL=mail.service.js.map