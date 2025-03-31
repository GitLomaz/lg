"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticatedGuard = exports.LocalAuthGuard = void 0;
const passport_1 = require("@nestjs/passport");
class LocalAuthGuard extends (0, passport_1.AuthGuard)('local') {
    async canActivate(context) {
        const result = (await super.canActivate(context));
        const request = context.switchToHttp().getRequest();
        await super.logIn(request);
        return result;
    }
}
exports.LocalAuthGuard = LocalAuthGuard;
class AuthenticatedGuard {
    async canActivate(context) {
        const req = context.switchToHttp().getRequest();
        console.log(req.isAuthenticated());
        return req.isAuthenticated();
    }
}
exports.AuthenticatedGuard = AuthenticatedGuard;
//# sourceMappingURL=LocalGuard.js.map