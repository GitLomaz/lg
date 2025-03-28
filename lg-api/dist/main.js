"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(cookieParser());
    app.enableCors({
        origin: 'http://localhost:3001',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    });
    app.use(session({
        name: 'LG_SESSION',
        secret: "THIS_NEEDS_TO_GO_INTO_ENV",
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false, maxAge: 1000 * 60 * 60 },
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}
bootstrap();
//# sourceMappingURL=main.js.map