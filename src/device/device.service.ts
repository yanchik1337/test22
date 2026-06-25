import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Device } from './device.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DeviceInfo } from '../deviceinfo/deviceinfo.entity';
@Injectable()
export class DeviceService {
  constructor(
    @InjectRepository(Device)
    private deviceRepository: Repository<Device>,
    @InjectRepository(DeviceInfo)
    private deviceInfoRepository: Repository<DeviceInfo>,
  ) {}

  async getOne(id: number) {
    const device = await this.deviceRepository.findOne({
      where: { id },
      relations: { deviceInfo: true, raitings: true },
    });
    if (!device) {
      throw new NotFoundException('Девайс не найден');
    }
    return device;
  }
  async getAll(query: any) {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 9;
    const skip = (page - 1) * limit;
    const where: any = {};

    const brandIdNum = Number(query.brandId);
    const typeIdNum = Number(query.typeId);

    if (brandIdNum && !isNaN(brandIdNum)) {
      where.brand = { id: brandIdNum };
    }
    if (typeIdNum && !isNaN(typeIdNum)) {
      where.type = { id: typeIdNum };
    }
    const [devices, totalCount] = await this.deviceRepository.findAndCount({
      where,
      relations: {
        brand: true,
        type: true,
        deviceInfo: true,
      },
      take: limit,
      skip: skip,
    } as any);
    return {
      count: totalCount,
      rows: devices,
    };
  }
  async create(body: any, img: any) {
    try {
      let { name, price, brandId, typeId, info } = body;
      const device = await this.deviceRepository.save({
        name,
        price: Number(price),
        brand: { id: Number(brandId) },
        type: { id: Number(typeId) },
        img: img.filename,
      });
      if (info) {
        const parsedInfo = typeof info === 'string' ? JSON.parse(info) : info;
        const infoEntites = parsedInfo.map((i: any) =>
          this.deviceInfoRepository.create({
            title: i.title,
            description: i.description,
            device: { id: device.id },
          }),
        );
        await this.deviceInfoRepository.save(infoEntites);
      }

      return device;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }
  async deleteDevice(params: any) {
    const { id } = params;
    let result;
    try {
      result = await this.deviceRepository.softDelete({ id: Number(id) });
    } catch (e) {
      throw new ConflictException();
    }

    if (result.affected === 0) {
      throw new NotFoundException(`Объект с ID ${id} не найден`);
    }
    return { success: true, message: 'Объект успешно удален' };
  }
}
