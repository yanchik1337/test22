import { CreateReviewDto } from './dto/createReviewDTO';
import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { RaitingService } from './raiting.service';
import { User } from '../decorators/user.decorator';
import { AuthGuard } from '../guards/auth.guard';

@Controller('raiting')
export class RaitingController {
  constructor(private readonly raitingService: RaitingService) {}

  @UseGuards(AuthGuard)
  @Post()
  async createReview(
    @User('id') userId: number,
    @Body() body: CreateReviewDto,
  ) {
    return this.raitingService.createReview(userId, body);
  }
}
