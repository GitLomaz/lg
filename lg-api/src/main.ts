import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import * as cookieParser from 'cookie-parser';
import session = require('express-session');
import * as passport from 'passport';
import { Pool } from 'pg';
const pgSession = require('connect-pg-simple')(session);

config();

async function bootstrap() {
  let origin = 'http://localhost:3210';
  if (process.env.API_LOCAL !== 'true') {
    origin = 'https://lomazgames.com';
  }

  const app = await NestFactory.create(AppModule);

  const apiPrefix = 'api';
  app.setGlobalPrefix(apiPrefix);

  // Debugging help: log configured origin, prefix and listen port
  console.log(`[api] CORS origin: ${origin}`);
  console.log(`[api] Global prefix set to: ${apiPrefix}`);

  app.use(cookieParser());

  app.enableCors({
    origin,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Create PostgreSQL connection pool for sessions
  const pgPool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  app.use(
    session({
      store: new pgSession({
        pool: pgPool,
        tableName: 'session',
        createTableIfMissing: true,
      }),
      name: 'LG_SESSION',
      secret: process.env.API_SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: process.env.API_LOCAL !== 'true',
        httpOnly: true,
        sameSite: process.env.API_LOCAL === 'true' ? 'lax' : 'none',
        maxAge: 1000 * 60 * 60 * 24, // 24 hours
      },
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(3000, '0.0.0.0');
}

bootstrap();