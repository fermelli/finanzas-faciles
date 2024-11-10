import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const databaseConfig = async (
  configService: ConfigService,
): Promise<TypeOrmModuleOptions> => {
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
};
