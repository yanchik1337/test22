import { IUser } from '../interfaces/userInterface/userInterface';
import { makeAutoObservable } from 'mobx';

export default class UserStore {
  _isAuth: boolean = false;
  _user: IUser = {};

  constructor() {
    makeAutoObservable(this);
  }
  setIsAuth(bool: boolean): void {
    this._isAuth = bool;
  }
  setUser(user: IUser) {
    this._user = user;
  }
  get isAuth() {
    return this._isAuth;
  }
  get user() {
    return this._user;
  }
}
