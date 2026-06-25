import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeModule } from '../src/types/type.module';
import { BasketDeviceModule } from '../src/basketDevice/basketdevice.module';
import { BasketModule } from '../src/basket/basket.module';
import { DeviceModule } from '../src/device/device.module';
import { DeviceinfoModule } from '../src/deviceinfo/deviceinfo.module';
import { RaitingModule } from '../src/raiting/raiting.module';
import { BrandModule } from '../src/brand/brand.module';
import { UserModule } from '../src/users/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: String(process.env.DB_PASSWORD),
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    TypeModule,
    BasketDeviceModule,
    BasketModule,
    DeviceModule,
    DeviceinfoModule,
    RaitingModule,
    BrandModule,
    UserModule,
    RaitingModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
