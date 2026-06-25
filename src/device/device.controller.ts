import { diskStorage, Multer } from 'multer';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { DeviceService } from './device.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname, resolve } from 'path';
import { randomUUID } from 'crypto';
@Controller('device')
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}

  @Get('/:id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.deviceService.getOne(id);
  }
  @Get('')
  getAll(@Query() query: any) {
    return this.deviceService.getAll(query);
  }
  @Post('')
  @UseInterceptors(
    FileInterceptor('img', {
      storage: diskStorage({
        destination: resolve('static'),
        filename: (req, file, callback) => {
          const uniqueName = randomUUID() + extname(file.originalname);
          callback(null, uniqueName);
        },
      }),
    }),
  )
  create(@Body() body: any, @UploadedFile() img: Express.Multer.File) {
    return this.deviceService.create(body, img);
  }

  @Delete('/:id')
  deleteDevice(@Param() params: number) {
    return this.deviceService.deleteDevice(params);
  }
}
