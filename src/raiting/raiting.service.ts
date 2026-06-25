import { BadRequestException, Injectable } from '@nestjs/common';
import { Raiting } from './raiting.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateReviewDto } from './dto/createReviewDTO';
import { Device } from '../device/device.entity';
@Injectable()
export class RaitingService {
  constructor(
    @InjectRepository(Raiting)
    private raitingRepository: Repository<Raiting>,
    @InjectRepository(Device)
    private deviceRepository: Repository<Device>,
  ) {}
  async createReview(userId: number, body: CreateReviewDto) {
    try {
      const raiting = await this.raitingRepository.save({
        user: { id: userId },
        device: { id: body.deviceId },
        name: body.name,
        rate: body.rate,
        comment: body.comment,
      });
      const allReviews = await this.raitingRepository.find({
        where: { device: { id: body.deviceId } },
      });
      const avgRating =
        allReviews.reduce((sum, r) => sum + Number(r.rate), 0) /
        allReviews.length;

      await this.deviceRepository.update(body.deviceId!, {
        raiting: Math.round(avgRating * 10) / 10,
      });
      return raiting;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }
}
