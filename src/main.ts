import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as session from 'express-session';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('ReservaBP API')
    .setDescription('Api de agendamentos entre Corretores de Seguro e Clientes')
    .setVersion('1.0')
    .addBearerAuth(
      {
        description: 'Default JWT Authorization',
        type: 'http',
        in: 'header',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'defaultBearerAuth',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.use(
    session({
      secret: 'keyboasdfqewr245124352asdfard',
      resave: false,
      saveUninitialized: false,
    }),
  );

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.enableCors();

  await app.listen(process.env.SERVER_PORT);
}
bootstrap();
