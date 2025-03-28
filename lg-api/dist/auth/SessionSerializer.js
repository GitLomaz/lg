"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionSerializer = void 0;
const passport_1 = require("@nestjs/passport");
class SessionSerializer extends passport_1.PassportSerializer {
    constructor(databaseService) {
        super();
        this.databaseService = databaseService;
    }
    serializeUser(user, done) {
        done(null, user);
    }
    async deserializeUser(payload, done) {
        const user = await this.databaseService.user.findUnique({ where: { id: payload.id } });
        return user ? done(null, user) : done(null, null);
    }
}
exports.SessionSerializer = SessionSerializer;
//# sourceMappingURL=SessionSerializer.js.map