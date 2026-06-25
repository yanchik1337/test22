import { Module } from '@nestjs/common';
import { RaitingController } from './raiting.controller';
import { RaitingService } from './raiting.service';
import { Raiting } from './raiting.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Device } from '../device/device.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Raiting, Device])],
  controllers: [RaitingController],
  providers: [RaitingService],
  exports: [RaitingService],
})
export class RaitingModule {}
