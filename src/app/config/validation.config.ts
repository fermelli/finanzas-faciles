import { BadRequestException } from '@nestjs/common';
import { ValidationError } from 'class-validator';

export const validationConfig = (errors: ValidationError[]) => {
  const errores = {};

  errors.forEach((error) => {
    errores[error.property] = Object.values(error.constraints);
  });

  return new BadRequestException({
    message: errores,
    statusCode: 400,
    error: 'Error de validación',
  });
};
