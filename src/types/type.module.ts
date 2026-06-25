import { Module } from '@nestjs/common';
import { TypeController } from './type.controller';
import { TypeService } from './type.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Type } from './type.entity';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [TypeOrmModule.forFeature([Type]), JwtModule.register({})],
  controllers: [TypeController],
  providers: [TypeService],
})
export class TypeModule {}
