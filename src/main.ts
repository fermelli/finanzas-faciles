import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const HOST = configService.get('HOST', 'localhost');
  const PORT = configService.get('PORT', 3000);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      exceptionFactory(errors: ValidationError[]) {
        const errores = {};

        errors.forEach((error) => {
          errores[error.property] = Object.values(error.constraints);
        });

        return new BadRequestException({
          message: errores,
          statusCode: 400,
          error: 'Error de validación',
        });
      },
    }),
  );

  await app.listen(PORT, HOST, () => {
    console.log(`Aplicación corriendo en ${HOST}:${PORT}`);
  });
}

bootstrap();
