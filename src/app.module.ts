import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GruposModule } from './grupos/grupos.module';
import { MetodosPagosModule } from './metodos-pagos/metodos-pagos.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { databaseConfig } from './app/config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: databaseConfig,
    }),
    GruposModule,
    MetodosPagosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
