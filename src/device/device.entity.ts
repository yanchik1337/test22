import {Entity,  PrimaryGeneratedColumn, Column , DeleteDateColumn, ManyToOne, JoinColumn, OneToMany} from "typeorm" ;
import { Type } from "../types/type.entity";
import { Brand } from "../brand/brand.entity";
import { Raiting } from "../raiting/raiting.entity";
import { BasketDevice } from "../basketDevice/basketdevice.entity";
import { DeviceInfo } from "../deviceinfo/deviceinfo.entity";
import { BaseEntity } from "../entity/base.entity";
@Entity()
export class Device extends BaseEntity{
@PrimaryGeneratedColumn()
id!:number;

@Column({ unique: true	,nullable: false  })
name!:string;

@Column({nullable: false })
price!:number;

@Column({default:0})
raiting!:number;


@Column({nullable: false })
img!:string;

@DeleteDateColumn()
deletedAt!: Date; 
	
  @ManyToOne(()=>Type,(type)=> type.devices)
  @JoinColumn({name:"typeId"})
  type!:Type

  @ManyToOne(()=>Brand,(brand)=>brand.devices)
  @JoinColumn({name:"brandId"})
  brand!:Brand
  
  @OneToMany(()=>Raiting,(raiting)=>raiting.device)
  raitings!:Raiting[];

  @OneToMany(()=>BasketDevice,(basketDevices)=>basketDevices.device)
  basketDevices!:BasketDevice[];

  @OneToMany(()=>DeviceInfo,(deviceInfo)=>deviceInfo.device)
  deviceInfo!:DeviceInfo[]
}
