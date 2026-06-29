import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { BasketService } from './basket.service';
import { AuthGuard } from '../guards/auth.guard';
import { User } from '../decorators/user.decorator';

@Controller('basket')
export class BasketController {
  constructor(private readonly basketService: BasketService) {}

  @Get()
  @UseGuards(AuthGuard)
  async getBasket(@User('id') userId: number) {
    return await this.basketService.getBasket(userId);
  }

  @Post()
  @UseGuards(AuthGuard)
  async addTobasket(
    @User('id') userId: number,
    @Body() body: { deviceId: number; quantity?: number },
  ) {
    const { deviceId, quantity = 1 } = body;
    return await this.basketService.addToBasket({ userId, deviceId, quantity });
  }

  @Put()
  @UseGuards(AuthGuard)
  async updateQuantity(
    @User() userId: number,
    @Body() body: { deviceId: number; action: 'plus' | 'minus' },
  ) {
    const { deviceId, action } = body;
    return await this.basketService.updateQuantity({
      userId,
      deviceId,
      action,
    });
  }
}
