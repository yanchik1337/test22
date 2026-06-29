import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/createBrand.dto';
import { AuthGuard } from '../guards/auth.guard';
import { CheckRoleGuard } from '../guards/checkrole.guard';
import { Roles } from '../decorators/roles.decorator';
@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}
  @Get()
  getAll() {
    return this.brandService.getAll();
  }

  @UseGuards(AuthGuard, CheckRoleGuard)
  @Roles('ADMIN')
  @Post()
  create(@Body() body: CreateBrandDto) {
    return this.brandService.create(body);
  }
}
