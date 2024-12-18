import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Grupo } from './entities/grupo.entity';
import { Equal, Repository } from 'typeorm';
import { Respuesta } from 'src/app/types';
import { CreateGrupoDto } from './dtos/create-grupo.dto';
import { UpdateGrupoDto } from './dtos/update-grupo.dto';
import { BaseService } from 'src/app/base.service';

@Injectable()
export class GruposService extends BaseService {
  constructor(
    @InjectRepository(Grupo)
    private readonly grupoRepository: Repository<Grupo>,
  ) {
    super();
  }

  async findAll(): Promise<Respuesta<Grupo[]>> {
    const grupos = await this.grupoRepository.find();

    return {
      message: 'Grupos recuperados correctamente',
      error: null,
      statusCode: 200,
      data: grupos,
    };
  }

  async create(createGrupoDto: CreateGrupoDto): Promise<Respuesta<Grupo>> {
    const grupo = this.grupoRepository.create(createGrupoDto);

    try {
      await this.grupoRepository.save(grupo);

      return {
        message: 'El grupo creado correctamente',
        error: null,
        statusCode: 201,
        data: grupo,
      };
    } catch (error) {
      this.manejarErrores(error);
    }
  }

  async findOne(id: number): Promise<Respuesta<Grupo>> {
    const grupo = await this.grupoRepository.findOne({
      where: {
        id: Equal(id),
      },
    });

    if (!grupo) {
      throw new NotFoundException('Grupo no encontrado');
    }

    return {
      message: 'Grupo recuperado correctamente',
      error: null,
      statusCode: 200,
      data: grupo,
    };
  }

  async update(
    id: number,
    updateGrupoDto: UpdateGrupoDto,
  ): Promise<Respuesta<Grupo>> {
    const grupo = await this.grupoRepository.preload({
      id,
      ...updateGrupoDto,
    });

    if (!grupo) {
      throw new NotFoundException('Grupo no encontrado');
    }

    try {
      await this.grupoRepository.save(grupo);

      return {
        message: 'Grupo actualizado correctamente',
        error: null,
        statusCode: 200,
        data: grupo,
      };
    } catch (error) {
      this.manejarErrores(error);
    }
  }

  async remove(id: number): Promise<Respuesta<Grupo>> {
    const grupo = (await this.findOne(id)).data;

    try {
      await this.grupoRepository.remove(grupo);

      return {
        message: 'Grupo eliminado correctamente',
        error: null,
        statusCode: 200,
        data: grupo,
      };
    } catch (error) {
      this.manejarErrores(error);
    }
  }
}
