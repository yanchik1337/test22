import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from '../utils/consts';
import { login, registration } from '../http/userAPI';
import { useStore } from '..';
import { IUser } from '../interfaces/userInterface/userInterface';

function Auth() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useStore();
  const isLogin = location.pathname === LOGIN_ROUTE;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const click = async () => {
    try {
      let data: IUser;
      if (isLogin) {
        data = await login(email, password);
      } else {
        data = await registration(email, password);
      }
      user.setUser(data);
      user.setIsAuth(true);
      navigate(SHOP_ROUTE);
    } catch (e) {
      const err = e as Error;
      alert(err.message);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px 14px',
    border: '1px solid #ddd',
    borderRadius: 8,
    fontSize: 14,
    outline: 'none',
    transition: 'border-color 0.15s',
    marginBottom: 12,
    boxSizing: 'border-box',
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 'calc(100vh - 56px)',
        background: '#f5f5f5',
      }}
    >
      <div
        style={{
          background: '#fff',
          border: '1px solid #ebebeb',
          borderRadius: 12,
          padding: '40px 36px',
          width: '100%',
          maxWidth: 420,
        }}
      >
        <h2
          style={{
            fontSize: 22,
            fontWeight: 700,
            marginBottom: 24,
            color: '#1a1a1a',
          }}
        >
          {isLogin ? 'Вход' : 'Регистрация'}
        </h2>

        <input
          style={inputStyle}
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
        />
        <input
          style={inputStyle}
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />

        <button
          onClick={click}
          style={{
            width: '100%',
            padding: '10px',
            background: '#1a1a1a',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            fontSize: 14,
            fontWeight: 600,
            cursor: 'pointer',
            marginBottom: 16,
          }}
        >
          {isLogin ? 'Войти' : 'Зарегистрироваться'}
        </button>

        <div style={{ fontSize: 13, color: '#666', textAlign: 'center' }}>
          {isLogin ? (
            <>
              Нет аккаунта?{' '}
              <NavLink
                to={REGISTRATION_ROUTE}
                style={{ color: '#1a1a1a', fontWeight: 600 }}
              >
                Зарегистрируйтесь
              </NavLink>
            </>
          ) : (
            <>
              Есть аккаунт?{' '}
              <NavLink
                to={LOGIN_ROUTE}
                style={{ color: '#1a1a1a', fontWeight: 600 }}
              >
                Войдите
              </NavLink>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Auth;
