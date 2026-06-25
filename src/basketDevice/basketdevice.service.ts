import { Injectable } from '@nestjs/common';
import { BasketDevice } from './basketdevice.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class BasketDeviceService {
	constructor(
				@InjectRepository(BasketDevice)
			private basketDeviceRepository:Repository<BasketDevice>
			){}
}
