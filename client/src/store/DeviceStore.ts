import { IRaiting } from './../interfaces/deviceInterface/deviceInterface';
import {
  IBasketDevice,
  IBrand,
  IDevice,
  IType,
} from '../interfaces/deviceInterface/deviceInterface';
import { makeAutoObservable } from 'mobx';
import { IAction } from '../interfaces/userInterface/userInterface';

export default class DeviceStore {
  _types: IType[] = [];
  _brands: IBrand[] = [];
  _devices: IDevice[] = [];
  _basket: IBasketDevice[] = [];
  _raiting: IRaiting[] = [];
  _selectedType = {} as IType;
  _selectedBrand = {} as IBrand;
  _page = 1;
  _totalCount = 0;
  _limit = 12;
  _quantity = 1;
  constructor() {
    makeAutoObservable(this);
  }

  setTypes(types: IType[]) {
    this._types = types;
  }
  setBrands(brands: IBrand[]) {
    this._brands = brands;
  }
  setDevices(devices: IDevice[]) {
    this._devices = devices;
  }
  setRaiting(raiting: IRaiting[]) {
    this._raiting = raiting;
  }
  setSelectedType(type: IType) {
    this.setPage(1);
    this._selectedType = type;
  }
  setSelectedBrand(brand: IBrand) {
    this._selectedBrand = brand;
  }
  setPage(page: number) {
    this._page = page;
  }
  setTotalCount(count: number) {
    this._totalCount = count;
  }
  setBasket(devices: IBasketDevice[]) {
    this._basket = devices;
  }
  appendDeviceToBasket(device: IDevice) {
    const newBasketItem: IBasketDevice = {
      id: Date.now(),
      basketId: 0,
      deviceId: device.id,
      quantity: 1,
      device: device,
    };
    this._basket.push(newBasketItem);
  }

  setDeviceQuantity({ deviceId, action }: IAction) {
    if (!this._basket) return;
    const foundDevice = this._basket.find((item) => item.id === deviceId);

    if (foundDevice) {
      if (action === 'plus') {
        foundDevice.quantity += 1;
      } else if (action === 'minus' && foundDevice.quantity > 1) {
        foundDevice.quantity -= 1;
      }
    }
  }
  get types() {
    return this._types;
  }
  get brands() {
    return this._brands;
  }
  get devices() {
    return this._devices;
  }
  get selectedType() {
    return this._selectedType;
  }
  get selectedBrand() {
    return this._selectedBrand;
  }
  get totalCount() {
    return this._totalCount;
  }
  get page() {
    return this._page;
  }
  get limit() {
    return this._limit;
  }
  get basket() {
    return this._basket;
  }
  get totalBasketPrice() {
    return this._basket.reduce(
      (sum, item) =>
        sum + (Number(item.device?.price) || 0) * (Number(item.quantity) || 1),
      0,
    );
  }
}
