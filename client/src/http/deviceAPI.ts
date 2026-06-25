import { $authHost, $host } from '.';
import {
  IBrand,
  IType,
  IDevice,
} from '../interfaces/deviceInterface/deviceInterface';
export const createType = async (type: IType) => {
  const { data } = await $authHost.post('/api/type', type);
  return data;
};

export const fetchTypes = async () => {
  const { data } = await $host.get('/api/type');
  return data;
};

export const createBrand = async (brand: IBrand) => {
  const { data } = await $authHost.post('/api/brand', brand);
  return data;
};

export const fetchBrands = async () => {
  const { data } = await $host.get('/api/brand');
  return data;
};
export const createDevice = async (device: FormData) => {
  const { data } = await $authHost.post('/api/device', device);
  return data;
};

export const fetchDevices = async (
  typeId: number | null,
  brandId: number | null,
  page: number,
  limit: number,
) => {
  const { data } = await $host.get('/api/device', {
    params: {
      typeId: typeId !== null ? typeId : undefined,
      brandId: brandId !== null ? brandId : undefined,
      page,
      limit,
    },
  });
  return data;
};

export const fetchOneDevice = async (id: IDevice['id']) => {
  const { data } = await $host.get('/api/device/' + id);
  return data;
};

export const deleteDeviceAPI = async (id: IDevice['id']) => {
  const { data } = await $authHost.delete('api/device/' + id);
  return data;
};

export const createReviewAPI = async (reviewDto: any) => {
  const { data } = await $authHost.post('api/raiting', reviewDto);
  return data;
};
