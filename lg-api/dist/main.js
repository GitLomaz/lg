"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const fs = require("fs");
async function bootstrap() {
    console.log('RUNNING!');
    console.log(process.env.API_DATABASE_URL);
    let httpsOptions = null;
    let origin = 'http://localhost:3001';
    if (process.env.API_LOCAL !== 'true') {
        origin = 'https://lomazgames.com';
        httpsOptions = {
            key: fs.readFileSync('/etc/letsencrypt/live/lomazgames.com/privkey.pem'),
            cert: fs.readFileSync('/etc/letsencrypt/live/lomazgames.com/fullchain.pem'),
        };
    }
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { httpsOptions });
    app.use(cookieParser());
    app.enableCors({
        origin: origin,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    });
    app.use(session({
        name: 'LG_SESSION',
        secret: process.env.API_SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: { secure: process.env.API_LOCAL !== 'true', maxAge: 1000 * 60 * 60 },
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}
bootstrap();
//# sourceMappingURL=main.js.map