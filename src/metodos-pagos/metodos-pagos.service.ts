import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';
import { MetodoPago } from './entities/metodo-pago.entity';
import { Respuesta } from '../app/types';
import { CreateMetodoPagoDto } from './dtos/create-metodo-pago.dto';

@Injectable()
export class MetodosPagosService {
  constructor(
    @InjectRepository(MetodoPago)
    private readonly metodoPagoRepository: Repository<MetodoPago>,
  ) {}

  private manejarErrores(error: any) {
    if (error.code === 'ER_DUP_ENTRY') {
      throw new BadRequestException('El metodo de pago ya existe');
    }

    if (error.code === 'WARN_DATA_TRUNCATED') {
      throw new BadRequestException('Campo incorrecto');
    }

    throw new BadRequestException('Error al actualizar el metodo de pago');
  }

  async create(
    createMetodoPagoDto: CreateMetodoPagoDto,
  ): Promise<Respuesta<MetodoPago>> {
    const newMetodoPago = this.metodoPagoRepository.create(createMetodoPagoDto);

    try {
      await this.metodoPagoRepository.save(newMetodoPago);

      return {
        message: 'El metodo de pago se creo correctamente',
        error: null,
        statusCode: 201,
        data: newMetodoPago,
      };
    } catch (error) {
      this.manejarErrores(error);
    }
  }

  async findOne(id: number): Promise<Respuesta<MetodoPago>> {
    const metodoPagoFound = await this.metodoPagoRepository.findOne({
      where: {
        id: Equal(id),
      },
    });

    if (!metodoPagoFound) {
      throw new NotFoundException('Metodo de pago no encontrado');
    }

    return {
      message: 'Metodo de pago recuperado correctamente',
      error: null,
      statusCode: 200,
      data: metodoPagoFound,
    };
  }

  async findAll(): Promise<Respuesta<MetodoPago[]>> {
    const metodosPagosList = await this.metodoPagoRepository.find();

    return {
      message: 'Metodos de pagos recuperados correctamente',
      error: null,
      statusCode: 200,
      data: metodosPagosList,
    };
  }

  async update(
    id: number,
    updateMetodoPagoDto: CreateMetodoPagoDto,
  ): Promise<Respuesta<MetodoPago>> {
    const metodoPagoUpdated = await this.metodoPagoRepository.preload({
      id,
      ...updateMetodoPagoDto,
    });

    if (!metodoPagoUpdated) {
      throw new NotFoundException('Metodo de pago no encontrado');
    }

    try {
      await this.metodoPagoRepository.save(metodoPagoUpdated);

      return {
        message: 'Metodo de pago actualizado correctamente',
        error: null,
        statusCode: 200,
        data: metodoPagoUpdated,
      };
    } catch (error) {
      this.manejarErrores(error);
    }
  }

  async remove(id: number): Promise<Respuesta<MetodoPago>> {
    const response = await this.findOne(id);
    const metodoPagoFound = response.data;

    try {
      await this.metodoPagoRepository.remove(metodoPagoFound);

      return {
        message: 'Metodo de pago eliminado correctamente',
        error: null,
        statusCode: 200,
        data: metodoPagoFound,
      };
    } catch (error) {
      this.manejarErrores(error);
    }
  }
}
