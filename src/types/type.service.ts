import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Type } from './type.entity';
import { Repository } from 'typeorm';
import { CreateTypeDto } from './dto/createType.dto';
@Injectable()
export class TypeService {
  constructor(
    @InjectRepository(Type)
    private typeRepository: Repository<Type>,
  ) {}

  async getAll() {
    return this.typeRepository.find();
  }
  async create(body: CreateTypeDto) {
    const { name } = body;
    const candidate = await this.typeRepository.findOneBy({ name });
    if (candidate) {
      throw new BadRequestException('Такой тип уже существует');
    }
    const type = this.typeRepository.create(body);
    return this.typeRepository.save(type);
  }
}
