import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Basket } from './basket.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BasketDevice } from '../basketDevice/basketdevice.entity';

@Injectable()
export class BasketService {
  constructor(
    @InjectRepository(Basket)
    private basketRepository: Repository<Basket>,

    @InjectRepository(BasketDevice)
    private readonly basketDeviceRepository: Repository<BasketDevice>,
  ) {}

  async addToBasket({ userId, deviceId, quantity }) {
    try {
      const basket = await this.basketRepository.findOne({
        where: { user: { id: userId } },
      });
      if (!basket) {
        throw new NotFoundException('Корзина не найдена!');
      }

      const existing = await this.basketDeviceRepository.findOne({
        where: { baskets: { id: basket.id }, device: { id: deviceId } },
      });

      if (existing) {
        existing.quantity += quantity;
        return await this.basketDeviceRepository.save(existing);
      }

      const basketDevice = await this.basketDeviceRepository.save({
        baskets: { id: basket.id },

        device: { id: deviceId },

        quantity,
      });
      return basketDevice;
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async getBasket(userId: number) {
    try {
      const basket = await this.basketRepository.findOne({
        where: { user: { id: userId } },
      });
      if (!basket) {
        throw new NotFoundException('Корзина не найдена');
      }

      const basketDevices = await this.basketDeviceRepository.find({
        where: { baskets: { id: basket.id } },
        relations: { device: true },
      });

      const result = basketDevices.map((bd) => {
        return {
          ...bd,
          deviceId: bd.device.id,
          quantity: bd.quantity,
        };
      });

      return result;
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
  async updateQuantity({ userId, deviceId, action }) {
    try {
      const basket = await this.basketRepository.findOne({
        where: { user: { id: userId } },
      });
      if (!basket) {
        throw new NotFoundException('Корзина не найдена!');
      }

      const basketDevice = await this.basketDeviceRepository.findOne({
        where: { baskets: { id: basket.id }, device: { id: deviceId } },
      });
      if (!basketDevice) {
        throw new NotFoundException('Товар не найден');
      }

      if (action === 'plus') {
        basketDevice.quantity += 1;
      } else if (action === 'minus') {
        if (basketDevice.quantity > 1) {
          basketDevice.quantity -= 1;
        } else {
          throw new InternalServerErrorException(
            'Количество не может быть меньше 1',
          );
        }
      }
      await this.basketDeviceRepository.save(basketDevice);
      return basketDevice;
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
