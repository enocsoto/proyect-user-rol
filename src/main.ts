import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const config = new DocumentBuilder()
    .setTitle('Crud Users whit Oracle and Nestjs')
    .setDescription(
      'This project is created to perform tests with NestJS and Mysql, establishing a connection with TypeORM and generating a user CRUD for testing purposes. The application is dockerized.',
    )
    .setVersion('1.0')
    .build();
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(configService.get('PORT'));
  console.log(`Server listen on port: ${configService.get('PORT')}`);
}
bootstrap();
