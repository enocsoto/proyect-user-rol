import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

ConfigModule.forRoot({
  envFilePath: `.${process.env.NODE_ENV}.env`,
});

const configService = new ConfigService();

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql', // aquí debe especificar su tipo de base de datos, puede ser mysql, postgresql, sqlite, etc.
  host: configService.get('DB_HOST'),
  port: +configService.get('DB_PORT'),
  username: configService.get('DB_USER'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get('DB_NAME'),
  entities: [`${__dirname}/../**/**/*.entity{.ts,.js}`],
  migrations: [__dirname + '/../../migrations/*{.ts,.js}'],
  synchronize: true,
  
};
export const dataSource = new DataSource(dataSourceOptions);
