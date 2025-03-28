import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as session from "express-session";
import * as passport from "passport";
import * as fs from 'fs';

async function bootstrap() {
  const httpsOptions = {
    key: fs.readFileSync('/etc/letsencrypt/live/lomazgames.com/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/lomazgames.com/fullchain.pem'),
  };

  const app = await NestFactory.create(AppModule, {httpsOptions});

  app.use(cookieParser());

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  app.use(
    session({
      name: 'LG_SESSION',
      secret: "THIS_NEEDS_TO_GO_INTO_ENV",
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false, maxAge: 1000 * 60 * 60 },
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}
bootstrap();
