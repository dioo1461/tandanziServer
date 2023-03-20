import {TypeOrmModuleOptions} from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3000,
    username: 'root',
    password: '1234',
    database: 'db',
    entities: ['dist/**/*.entity.{ts,js}'],
    synchronize: true,
}