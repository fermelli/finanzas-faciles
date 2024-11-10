import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { validationConfig } from './app/config/validation.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const HOST = configService.get('HOST', 'localhost');
  const PORT = configService.get('PORT', 3000);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      exceptionFactory: validationConfig,
    }),
  );

  await app.listen(PORT, HOST, () => {
    console.log(`Aplicación corriendo en ${HOST}:${PORT}`);
  });
}

bootstrap();
