import { BadRequestException, Logger } from '@nestjs/common';

export class BaseService {
  private readonly logger = new Logger(this.constructor.name);

  constructor() {}

  protected manejarErrores(error: any) {
    this.logger.error(error);

    if (error.code === 'ER_DUP_ENTRY') {
      throw new BadRequestException('El registro ya existe');
    }

    if (error.code === 'WARN_DATA_TRUNCATED') {
      throw new BadRequestException('Campo incorrecto');
    }

    throw new BadRequestException('Error al procesar la solicitud');
  }
}
