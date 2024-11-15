import { BadRequestException } from '@nestjs/common';

export class BaseService {
  constructor() {}

  protected manejarErrores(error: any) {
    if (error.code === 'ER_DUP_ENTRY') {
      throw new BadRequestException('El registro ya existe');
    }

    if (error.code === 'WARN_DATA_TRUNCATED') {
      throw new BadRequestException('Campo incorrecto');
    }

    throw new BadRequestException('Error al procesar la solicitud');
  }
}
