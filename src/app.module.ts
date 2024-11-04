import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GruposModule } from './grupos/grupos.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'finanzas_faciles_db',
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
    }),
    GruposModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
