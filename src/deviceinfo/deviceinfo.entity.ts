import {Entity,  PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn} from "typeorm" ;
import { Device } from "../device/device.entity";
import { BaseEntity } from "../entity/base.entity";
@Entity()
export class DeviceInfo extends BaseEntity{
@PrimaryGeneratedColumn()
id!:number;

@Column({nullable:false})
title!:string;

@Column({nullable:false})
description!:string;

@ManyToOne(()=>Device,(device)=>device.deviceInfo)
@JoinColumn({name:"deviceId"})
device!:Device
}