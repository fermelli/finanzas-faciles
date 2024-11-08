import { BadRequestException } from '@nestjs/common';

export class BaseService {
  constructor() {}

  protected manejarErrores(error: any) {
    if (error.code === 'ER_DUP_ENTRY') {
      throw new BadRequestException('El metodo de pago ya existe');
    }

    if (error.code === 'WARN_DATA_TRUNCATED') {
      throw new BadRequestException('Campo incorrecto');
    }

    throw new BadRequestException('Error al actualizar el metodo de pago');
  }
}
