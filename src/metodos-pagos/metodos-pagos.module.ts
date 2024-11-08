import { Module } from '@nestjs/common';
import { MetodosPagosController } from './metodos-pagos.controller';
import { MetodosPagosService } from './metodos-pagos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MetodoPago } from './entities/metodo-pago.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MetodoPago])],
  controllers: [MetodosPagosController],
  providers: [MetodosPagosService],
})
export class MetodosPagosModule {}
