import { BadRequestException, Injectable } from '@nestjs/common';
import { Brand } from './brand.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBrandDto } from './dto/createBrand.dto';
@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(Brand)
    private brandRepository: Repository<Brand>,
  ) {}
  async getAll() {
    return this.brandRepository.find();
  }
  async create(body: CreateBrandDto) {
    const { name } = body;
    const candidate = await this.brandRepository.findOneBy({ name });
    if (candidate) {
      throw new BadRequestException('Такой брэнд уже существует');
    }
    const brand = this.brandRepository.create(body);
    return this.brandRepository.save(brand);
  }
}
