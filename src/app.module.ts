import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GruposModule } from './grupos/grupos.module';
import { MetodosPagosModule } from './metodos-pagos/metodos-pagos.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'mysql',
          host: configService.get('DB_HOST', 'localhost'),
          port: parseInt(configService.get('DB_PORT', '3306'), 10),
          username: configService.get('DB_USERNAME', 'root'),
          password: configService.get('DB_PASSWORD', ''),
          database: configService.get('DB_DATABASE', 'finanzas_faciles_db'),
          autoLoadEntities:
            configService.get('DB_AUTO_LOAD_ENTITIES', false) === 'true',
          synchronize: configService.get('DB_SYNCHRONIZE', false) === 'true',
          logging: configService.get('DB_LOGGING', false) === 'true',
        };
      },
    }),
    GruposModule,
    MetodosPagosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
