import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { GruposService } from './grupos.service';
import { Grupo } from './entities/grupo.entity';
import { Respuesta } from 'src/app/types';
import { CreateGrupoDto } from './dtos/create-grupo.dto';
import { FindOneParamsDto } from '../common/dtos/find-one-params.dto';
import { UpdateGrupoDto } from './dtos/update-grupo.dto';

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

  @Patch(':id')
  async update(
    @Param() { id }: FindOneParamsDto,
    @Body() updateGrupoDto: UpdateGrupoDto,
  ): Promise<Respuesta<Grupo>> {
    return await this.gruposService.update(id, updateGrupoDto);
  }

  @Delete(':id')
  async remove(@Param() { id }: FindOneParamsDto): Promise<Respuesta<Grupo>> {
    return await this.gruposService.remove(id);
  }
}
