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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcryptjs");
const responseCodes_1 = require("../common/responseCodes");
const database_service_1 = require("../database/database.service");
let AuthService = class AuthService {
    constructor(databaseService) {
        this.databaseService = databaseService;
    }
    async verifyEmail(token) {
        const user = await this.databaseService.user.findUnique({ where: { verification_token: token } });
        if (!user)
            return (0, responseCodes_1.generateServerResponse)('INVALID_TOKEN');
        await this.databaseService.user.update({
            where: { id: user.id },
            data: {
                is_verified: true,
                verification_token: null,
            },
        });
        return (0, responseCodes_1.generateServerResponse)('ACCOUNT_VERIFIED');
    }
    async validateUser(username, password) {
        const user = await this.getUserByEmailOrUsername(username);
        if (!user) {
            return (0, responseCodes_1.generateServerResponse)('LOGIN_FAILED');
        }
        const passwordHash = user.passwords[0].password_hash;
        const isMatch = await bcrypt.compare(password, passwordHash);
        if (!isMatch) {
            return (0, responseCodes_1.generateServerResponse)('LOGIN_FAILED');
        }
        if (!user.is_verified) {
            return (0, responseCodes_1.generateServerResponse)('ACCOUNT_UNVERIFIED');
        }
        return user;
    }
    async getUserByEmailOrUsername(username) {
        if (!username)
            return null;
        return this.databaseService.user.findFirst({
            where: {
                OR: [
                    { username: username },
                    { email: username }
                ],
            },
            include: {
                passwords: {
                    orderBy: { created_at: 'desc' },
                    take: 1,
                },
            },
        });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], AuthService);
//# sourceMappingURL=auth.service.js.map