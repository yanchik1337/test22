import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Basket } from '../basket/basket.entity';
import { Device } from '../device/device.entity';
import { BaseEntity } from '../entity/base.entity';
@Entity()
export class BasketDevice extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ default: 1 })
  quantity!: number;

  @ManyToOne(() => Basket, (basket) => basket.basketDevices)
  @JoinColumn({ name: 'basketId' })
  baskets!: Basket;

  @ManyToOne(() => Device, (device) => device.basketDevices)
  @JoinColumn({ name: 'deviceId' })
  device!: Device;
}
