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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../database/database.service");
const mail_service_1 = require("../mail/mail.service");
const bcrypt = require("bcryptjs");
const crypto_1 = require("crypto");
const responseCodes_1 = require("../common/responseCodes");
let UserService = class UserService {
    constructor(databaseService, mailService) {
        this.databaseService = databaseService;
        this.mailService = mailService;
    }
    async checkIfUserExists(username, email) {
        const existingEmail = await this.databaseService.user.findUnique({ where: { email } });
        if (existingEmail)
            return (0, responseCodes_1.generateServerResponse)('EMAIL_TAKEN');
        const existingUser = await this.databaseService.user.findUnique({ where: { username } });
        if (existingUser)
            return (0, responseCodes_1.generateServerResponse)('USERNAME_TAKEN');
        return null;
    }
    async register(username, email, password) {
        const existingUserCheck = await this.checkIfUserExists(username, email);
        if (existingUserCheck)
            return existingUserCheck;
        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationToken = (0, crypto_1.randomUUID)();
        const user = await this.databaseService.user.create({
            data: {
                username,
                email,
                verification_token: verificationToken,
            },
        });
        await this.databaseService.passwords.create({
            data: {
                user_id: user.id,
                password_hash: hashedPassword,
            },
        });
        await this.mailService.sendVerificationEmail(email, verificationToken);
        return (0, responseCodes_1.generateServerResponse)('ACCOUNT_REGISTERED', { email: email });
    }
    async verifyEmail(token) {
        const user = await this.databaseService.user.findUnique({ where: { verification_token: token } });
        if (!user) {
            return (0, responseCodes_1.generateServerResponse)('INVALID_TOKEN');
        }
        await this.databaseService.user.update({
            where: { id: user.id },
            data: {
                is_verified: true,
                verification_token: null,
            },
        });
        return (0, responseCodes_1.generateServerResponse)('ACCOUNT_VERIFIED');
    }
    async getUserByEmailOrUsername(username, email) {
        return this.databaseService.user.findFirst({
            where: {
                OR: [
                    { email },
                    { username }
                ]
            },
            include: {
                passwords: {
                    orderBy: {
                        created_at: 'desc'
                    },
                    take: 1
                }
            }
        });
    }
    sanitizeUser(user) {
        delete user.id;
        delete user.developer;
        delete user.email;
        delete user.is_verified;
        delete user.verification_token;
        delete user.created_at;
        delete user.updated_at;
        delete user.passwords;
        return user;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService,
        mail_service_1.MailService])
], UserService);
//# sourceMappingURL=user.service.js.map