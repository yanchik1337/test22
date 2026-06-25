import React, { createContext, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserStore from './store/UserStore';
import DeviceStore from './store/DeviceStore';

interface IContextProps {
  user: UserStore;
  device: DeviceStore;
}

export const Context = createContext<IContextProps | null>(null);
export const useStore = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error('useStore должен использоваться внутри Context.Provider');
  }
  return context;
};
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <Context.Provider
    value={{
      user: new UserStore(),
      device: new DeviceStore(),
    }}
  >
    <App />
  </Context.Provider>,
);
