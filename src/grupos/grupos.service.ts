import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Grupo } from './entities/grupo.entity';
import { Repository } from 'typeorm';
import { Respuesta } from 'src/app/types';
import { CreateGrupoDto } from './dtos/create-grupo.dto';

@Injectable()
export class GruposService {
  constructor(
    @InjectRepository(Grupo)
    private readonly grupoRepository: Repository<Grupo>,
  ) {}

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
      if (error.code === 'ER_DUP_ENTRY') {
        throw new BadRequestException('El grupo ya existe');
      }

      if (error.code === 'WARN_DATA_TRUNCATED') {
        throw new BadRequestException('Campo incorrecto');
      }

      throw new BadRequestException('Error al crear el grupo');
    }
  }
}
