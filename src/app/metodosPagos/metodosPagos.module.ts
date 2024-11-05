import { Module } from '@nestjs/common';
import { MetodosPagosController } from './metodosPagos.controller';
import { MetodosPagosService } from './metodosPagos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MetodoPago } from './entities/metodoPago.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MetodoPago])],
  controllers: [MetodosPagosController],
  providers: [MetodosPagosService],
})
export class MetodosPagosModule {}
