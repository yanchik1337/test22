import { BasketDevice } from './../basketDevice/basketdevice.entity';
import { User } from './../users/user.entity';
import {Entity,  PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany} from "typeorm" ;
import { BaseEntity } from '../entity/base.entity';
@Entity ()
export class Basket extends BaseEntity{
@PrimaryGeneratedColumn()
id!:number;

@OneToOne(()=>User,(user)=>user.basket)
@JoinColumn({name:"userId"})
user!:User;

@OneToMany(()=>BasketDevice,(basketDevice)=>basketDevice.baskets)
basketDevices!:BasketDevice[]
}