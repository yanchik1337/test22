import { Module } from '@nestjs/common';
import { BasketDeviceController } from './basketdevice.controller';
import { BasketDevice } from './basketdevice.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BasketDeviceService } from './basketdevice.service';
@Module({
    imports: [TypeOrmModule.forFeature([BasketDevice])],
    controllers: [BasketDeviceController],
    providers: [BasketDeviceService],
})
export class BasketDeviceModule {}
