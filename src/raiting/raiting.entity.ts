import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Device } from '../device/device.entity';
import { BaseEntity } from '../entity/base.entity';
@Entity()
export class Raiting extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    nullable: false,
  })
  name!: string;

  @Column()
  comment!: string;

  @Column({ nullable: false })
  rate!: number;

  @ManyToOne(() => User, (user) => user.raitings)
  @JoinColumn({ name: 'userId' })
  user!: User;

  @ManyToOne(() => Device, (device) => device.raitings)
  @JoinColumn({ name: 'deviceId' })
  device!: Device;
}
