import { Body, Controller, Get, Post } from '@nestjs/common';
import { GruposService } from './grupos.service';
import { Grupo } from './entities/grupo.entity';
import { Respuesta } from 'src/app/types';
import { CreateGrupoDto } from './dtos/create-grupo.dto';

@Controller('grupos')
export class GruposController {
  constructor(private readonly gruposService: GruposService) {}

  @Get()
  async findAll(): Promise<Respuesta<Grupo[]>> {
    return await this.gruposService.findAll();
  }

  @Post()
  async create(
    @Body() createGrupoDto: CreateGrupoDto,
  ): Promise<Respuesta<Grupo>> {
    return await this.gruposService.create(createGrupoDto);
  }
}
