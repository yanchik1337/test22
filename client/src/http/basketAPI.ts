import {
  IBasketDevice,
  IDevice,
} from '../interfaces/deviceInterface/deviceInterface';
import { $authHost } from './index';

export const addDeviceToBasketAPI = async (deviceId: IDevice['id']) => {
  const { data } = await $authHost.post('api/basket', { deviceId });
  return data;
};

export const fetchBasketAPI = async () => {
  const { data } = await $authHost.get('api/basket');
  return data;
};

export const updateQuantityAPI = async (
  deviceId: number,
  action: 'plus' | 'minus',
) => {
  const { data } = await $authHost.put('api/basket', { deviceId, action });
  return data;
};
