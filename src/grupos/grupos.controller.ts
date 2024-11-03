import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { GruposService } from './grupos.service';
import { Grupo } from './entities/grupo.entity';
import { Respuesta } from 'src/app/types';
import { CreateGrupoDto } from './dtos/create-grupo.dto';
import { FindOneParamsDto } from '../common/dtos/find-one-params.dto';

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

  @Get(':id')
  async findOne(@Param() { id }: FindOneParamsDto): Promise<Respuesta<Grupo>> {
    return await this.gruposService.findOne(id);
  }
}
