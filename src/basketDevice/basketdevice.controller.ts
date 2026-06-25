import { BasketDeviceService } from './basketdevice.service';
import { Controller } from '@nestjs/common';
@Controller()
export class BasketDeviceController {
		constructor(private readonly basketDeviceService: BasketDeviceService){}
}
