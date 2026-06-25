import {Entity,  PrimaryGeneratedColumn, Column, ManyToMany, OneToMany} from "typeorm" ;
import { Type } from "../types/type.entity";
import { Device } from "../device/device.entity";
import { BaseEntity } from "../entity/base.entity";
@Entity()
export class Brand extends BaseEntity{
@PrimaryGeneratedColumn()
id!:number;

@Column({ 
	unique: true  , 
	nullable: false })
name!:string;

@ManyToMany(()=>	Type, (type)	=> type.brands)
types!:Type[];

@OneToMany(()=>Device,(device)=>device.brand)
devices!:Device[]
}