import { CreateReviewDto } from './dto/createReviewDTO';
import { Body, Controller, Post, Req } from '@nestjs/common';
import { RaitingService } from './raiting.service';
import { User } from '../decorators/user.decorator';

@Controller('raiting')
export class RaitingController {
  constructor(private readonly raitingService: RaitingService) {}

  @Post()
  async createReview(
    @User('id') userId: number,
    @Body() body: CreateReviewDto,
  ) {
    return this.raitingService.createReview(userId, body);
  }
}
