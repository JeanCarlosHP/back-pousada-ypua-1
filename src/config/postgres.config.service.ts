import { Injectable } from "@nestjs/common"
import {TypeOrmModuleOptions, TypeOrmOptionsFactory} from "@nestjs/typeorm"
import {ConfigService} from '@nestjs/config';

@Injectable()
export class PostgresConfigService implements TypeOrmOptionsFactory {
    constructor(private configService: ConfigService) {}
    createTypeOrmOptions(): TypeOrmModuleOptions {
        return{
            type: 'postgres',
            host: this.configService.get<string>('DB_HOST'),
            port: this.configService.get<number>('DB_PORT'),
            username: this.configService.get<string>('DB_USER'),
            password: this.configService.get<string>('DB_PASSWORD'),
            database: this.configService.get<string>('DB_NAME'),
            entities: [__dirname + '/../**/*.entity{.js,.ts}'],
            synchronize:false,
            ssl: this.configService.get<boolean>('DB_SSL'),
            extra: {
                ssl: {
                    rejectUnauthorized: false
                }
            }
        }
    }
}