import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { DeviceController } from './device.controller';
import { DeviceService } from './device.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Device } from './device.entity';
import { DeviceInfo } from '../deviceinfo/deviceinfo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Device, DeviceInfo])],
  controllers: [DeviceController],
  providers: [DeviceService],
})
export class DeviceModule {}
