import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { Basket } from '../basket/basket.entity';
import { Raiting } from '../raiting/raiting.entity';
import { BaseEntity } from '../entity/base.entity';
@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column({ default: 'USER' })
  role!: 'USER' | 'ADMIN';

  @OneToOne(() => Basket, (basket) => basket.user)
  basket!: Basket;

  @OneToMany(() => Raiting, (raiting) => raiting.user)
  raitings!: Raiting[];
}
