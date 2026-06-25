import { DeviceInfo } from './../../../../src/deviceinfo/deviceinfo.entity';
export interface IType {
  id?: number;
  name: string;
}
export interface IBrand {
  id?: number;
  name: string;
}
export interface IDeviceInfo {
  id: number;
  title?: string;
  description?: string;
  deviceId?: number;
}
export interface IDevice {
  id: number;
  name: string;
  price: number;
  raiting: number;
  img: string;
  typeId: number;
  brandId: number;
  deviceInfo: IDeviceInfo[];
}
export interface IBasket {
  id: number;
  userId: number;
}
export interface IBasketDevice {
  id: number;
  basketId: number;
  deviceId: number;
  quantity: number;
  device: IDevice;
}
export interface IFetchDevicesParams {
  typeId?: number | null;
  brandId?: number | null;
  page?: number;
  limit?: number;
}

export interface CreateProps {
  show: boolean;
  onHide: () => void;
}

export interface IRaiting {
  id: number;
  name: string;
  comment: string;
  rate: number;
  userId: number;
  deviceId: number;
}
