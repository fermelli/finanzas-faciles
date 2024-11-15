import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TransaccionesService } from './transacciones.service';
import { CreateTransaccionDto } from './dto/create-transaccion.dto';
import { UpdateTransaccionDto } from './dto/update-transaccion.dto';
import { Respuesta } from 'src/app/types';
import { Transaccion } from './entities/transaccion.entity';

@Controller('transacciones')
export class TransaccionesController {
  constructor(private readonly transaccionesService: TransaccionesService) {}

  @Post()
  async create(
    @Body() createTransaccioneDto: CreateTransaccionDto,
  ): Promise<Respuesta<Transaccion>> {
    return await this.transaccionesService.create(createTransaccioneDto);
  }

  @Get()
  async findAll(): Promise<Respuesta<Transaccion[]>> {
    return await this.transaccionesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Respuesta<Transaccion>> {
    return await this.transaccionesService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTransaccioneDto: UpdateTransaccionDto,
  ): Promise<Respuesta<Transaccion>> {
    return await this.transaccionesService.update(+id, updateTransaccioneDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Respuesta<Transaccion>> {
    return await this.transaccionesService.remove(+id);
  }
}
