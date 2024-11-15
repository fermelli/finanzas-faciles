import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransaccionDto } from './dto/create-transaccion.dto';
import { UpdateTransaccionDto } from './dto/update-transaccion.dto';
import { BaseService } from 'src/app/base.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaccion } from './entities/transaccion.entity';
import { Equal, Repository } from 'typeorm';
import { Respuesta } from 'src/app/types';

@Injectable()
export class TransaccionesService extends BaseService {
  constructor(
    @InjectRepository(Transaccion)
    private transaccionRepository: Repository<Transaccion>,
  ) {
    super();
  }

  async create(
    createTransaccioneDto: CreateTransaccionDto,
  ): Promise<Respuesta<Transaccion>> {
    const transaccion = this.transaccionRepository.create(
      createTransaccioneDto,
    );

    try {
      await this.transaccionRepository.save(transaccion);

      return {
        message: 'La transaccion se creo correctamente',
        error: null,
        statusCode: 201,
        data: transaccion,
      };
    } catch (error) {
      this.manejarErrores(error);
    }
  }

  async findAll(): Promise<Respuesta<Transaccion[]>> {
    const transacciones = await this.transaccionRepository.find();

    return {
      message: 'Lista de transacciones',
      error: null,
      statusCode: 200,
      data: transacciones,
    };
  }

  async findOne(id: number): Promise<Respuesta<Transaccion>> {
    const transaccion = await this.transaccionRepository.findOne({
      where: { id: Equal(id) },
    });

    if (!transaccion) {
      throw new NotFoundException('Transaccion no encontrada');
    }

    return {
      message: 'Transaccion encontrada',
      error: null,
      statusCode: 200,
      data: transaccion,
    };
  }

  async update(
    id: number,
    updateTransaccioneDto: UpdateTransaccionDto,
  ): Promise<Respuesta<Transaccion>> {
    const transaccion = await this.transaccionRepository.preload({
      id,
      ...updateTransaccioneDto,
    });

    if (!transaccion) {
      throw new NotFoundException('Transaccion no encontrada');
    }

    try {
      await this.transaccionRepository.save(transaccion);

      return {
        message: 'La transaccion se actualizo correctamente',
        error: null,
        statusCode: 200,
        data: transaccion,
      };
    } catch (error) {
      this.manejarErrores(error);
    }
  }

  async remove(id: number): Promise<Respuesta<Transaccion>> {
    const response = await this.findOne(id);
    const transaccion = response.data;

    try {
      await this.transaccionRepository.remove(transaccion);

      return {
        message: 'La transaccion eliminada correctamente',
        error: null,
        statusCode: 200,
        data: transaccion,
      };
    } catch (error) {
      this.manejarErrores(error);
    }
  }
}
