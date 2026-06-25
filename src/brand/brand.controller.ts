import { Body, Controller, Get, Post } from '@nestjs/common';
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/createBrand.dto';
@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}
  @Get()
  getAll() {
    return this.brandService.getAll();
  }

  @Post()
  create(@Body() body: CreateBrandDto) {
    return this.brandService.create(body);
  }
}
