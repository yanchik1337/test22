import { BasketService } from './basket.service';
import { BasketController } from './basket.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Basket } from './basket.entity';
import { BasketDevice } from '../basketDevice/basketdevice.entity';
import { AuthGuard } from '../guards/auth.guard';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Basket, BasketDevice]),
    JwtModule.register({}),
  ],
  controllers: [BasketController],
  providers: [BasketService, AuthGuard],
  exports: [BasketService],
})
export class BasketModule {}
