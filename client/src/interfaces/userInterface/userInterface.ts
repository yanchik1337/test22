export interface IUser {
  id?: number;
  email?: string;
  role?: 'USER' | 'ADMIN';
}

export interface IAction {
  deviceId: number;
  action: 'plus' | 'minus';
}
