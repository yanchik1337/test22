import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeviceInfo } from './deviceinfo.entity';
@Module({
    imports: [TypeOrmModule.forFeature([DeviceInfo])],
    controllers: [],
    providers: [], 
    exports: [TypeOrmModule],
})
export class DeviceinfoModule {}
