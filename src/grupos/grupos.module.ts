import { Module } from '@nestjs/common';
import { GruposController } from './grupos.controller';
import { GruposService } from './grupos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Grupo } from './entities/grupo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Grupo])],
  controllers: [GruposController],
  providers: [GruposService],
})
export class GruposModule {}
