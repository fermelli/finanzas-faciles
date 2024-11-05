import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { MetodosPagosService } from './metodosPagos.service';
import { Respuesta } from '../types';
import { MetodoPago } from './entities/metodoPago.entity';
import { FindOneParamsDto } from 'src/common/dtos/find-one-params.dto';
import { CreateMetodoPagoDto } from './dtos/create-metodoPago.dto';

@Controller('metodos-pagos')
export class MetodosPagosController {
  constructor(private readonly metodosPagosService: MetodosPagosService) {}

  @Post()
  async create(
    @Body() createMetodoPagoDto: CreateMetodoPagoDto,
  ): Promise<Respuesta<MetodoPago>> {
    return await this.metodosPagosService.create(createMetodoPagoDto);
  }

  @Get()
  async findAll(): Promise<Respuesta<MetodoPago[]>> {
    const metodosPagosList = await this.metodosPagosService.findAll();
    return metodosPagosList;
  }

  @Get(':id') // Recordar: Por que se hace la desestructuración del id?
  async findOne(
    @Param() { id }: FindOneParamsDto, //FindOneParamsDto transforma el id string a number?
  ): Promise<Respuesta<MetodoPago>> {
    return await this.metodosPagosService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param() { id }: FindOneParamsDto,
    @Body() updateMetodoPagoDto: CreateMetodoPagoDto,
  ): Promise<Respuesta<MetodoPago>> {
    return await this.metodosPagosService.update(id, updateMetodoPagoDto);
  }

  @Delete(':id')
  async remove(
    @Param() { id }: FindOneParamsDto,
  ): Promise<Respuesta<MetodoPago>> {
    return await this.metodosPagosService.remove(id);
  }
}
