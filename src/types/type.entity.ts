import {Entity,  PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany} from "typeorm" ;
import { Brand } from "../brand/brand.entity";
import { Device } from "../device/device.entity";
import { BaseEntity } from "../entity/base.entity";
@Entity()
export class Type extends BaseEntity{
@PrimaryGeneratedColumn()
id!:number;

@Column({ 
	unique: true  , 
	nullable: false })
name!:string;

@OneToMany(()=>Device,(device)=>device.type)
devices!:Device

@ManyToMany(()=>Brand,(brand)=>brand.types)
@JoinTable({
	name:"type_brand",
	joinColumn:{name:"typeId", referencedColumnName:"id"},
	inverseJoinColumn: { name: 'brandId', referencedColumnName: 'id' }
})
brands!:Brand[]
}