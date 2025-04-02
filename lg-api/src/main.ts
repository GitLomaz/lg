import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import * as cookieParser from 'cookie-parser';
import * as session from "express-session";
import * as passport from "passport";
import * as fs from 'fs';

config();
async function bootstrap() {
  let httpsOptions = null
  let origin = 'http://localhost:3001';
  if (process.env.API_LOCAL !== 'true') {
    origin = 'https://lomazgames.com';
    httpsOptions = {
      key: fs.readFileSync('/etc/letsencrypt/live/lomazgames.com/privkey.pem'),
      cert: fs.readFileSync('/etc/letsencrypt/live/lomazgames.com/fullchain.pem'),
    };
  }

  const app = await NestFactory.create(AppModule, {httpsOptions});

  app.use(cookieParser());

  app.enableCors({
    origin: origin,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  app.use(
    session({
      name: 'LG_SESSION',
      secret: process.env.API_SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: { secure: process.env.API_LOCAL !== 'true', maxAge: 1000 * 60 * 60 },
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}
bootstrap();
