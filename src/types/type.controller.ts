import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { TypeService } from './type.service';
import { CreateTypeDto } from './dto/createType.dto';
import { AuthGuard } from '../guards/auth.guard';
import { CheckRoleGuard } from '../guards/checkrole.guard';
import { Roles } from '../decorators/roles.decorator';
@Controller('type')
export class TypeController {
  constructor(private readonly typeService: TypeService) {}
  @Get()
  getAll() {
    return this.typeService.getAll();
  }

  @Post()
  @UseGuards(AuthGuard, CheckRoleGuard)
  @Roles('ADMIN')
  create(@Body() body: CreateTypeDto) {
    return this.typeService.create(body);
  }
}
