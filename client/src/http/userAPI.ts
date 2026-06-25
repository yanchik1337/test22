import { IUser } from './../interfaces/userInterface/userInterface';
import { $authHost, $host } from '.';
import { jwtDecode } from 'jwt-decode';

export const registration = async (email: IUser['email'], password: string) => {
  const { data } = await $host.post('/api/user/registration', {
    email,
    password,
    role: 'USER',
  });
  localStorage.setItem('token', data.token);
  return jwtDecode<IUser>(data.token);
};

export const login = async (email: IUser['email'], password: string) => {
  const { data } = await $host.post('/api/user/login', {
    email,
    password,
  });
  localStorage.setItem('token', data.token);
  return jwtDecode<IUser>(data.token);
};

export const check = async (email?: IUser['email'], password?: string) => {
  const { data } = await $authHost.get('/api/user/auth', {});
  localStorage.setItem('token', data.token);
  return jwtDecode<IUser>(data.token);
};
