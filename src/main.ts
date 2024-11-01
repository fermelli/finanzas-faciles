import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
