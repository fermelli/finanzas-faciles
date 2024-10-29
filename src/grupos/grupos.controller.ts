import { Controller, Get } from '@nestjs/common';
import { GruposService } from './grupos.service';
import { Grupo } from './entities/grupo.entity';

@Controller('grupos')
export class GruposController {
  constructor(private readonly gruposService: GruposService) {}

  @Get()
  async findAll(): Promise<Grupo[]> {
    return await this.gruposService.findAll();
  }
}
