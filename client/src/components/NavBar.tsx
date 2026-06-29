import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Image from 'react-bootstrap/Image';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';

import {
  ADMIN_ROUTE,
  BASKET_ROUTE,
  LOGIN_ROUTE,
  SHOP_ROUTE,
} from '../utils/consts';

import basketIcon from '../assets/Basket.png';
import { useStore } from '..';

const NavBar = observer(() => {
  const navigate = useNavigate();
  const { user } = useStore();

  const logOut = () => {
    localStorage.removeItem('token');
    user.setUser({});
    user.setIsAuth(false);
    navigate(SHOP_ROUTE);
  };

  return (
    <Navbar
      expand="lg"
      style={{
        background: '#ffffff',
        borderBottom: '1px solid #e8e8e8',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        padding: '0',
        height: 56,
      }}
    >
      <Container fluid style={{ paddingInline: 24 }}>
        {/* LOGO */}
        <Navbar.Brand
          onClick={() => navigate(SHOP_ROUTE)}
          style={{
            cursor: 'pointer',
            fontSize: '1.25rem',
            fontWeight: 700,
            color: '#1a1a1a',
            letterSpacing: '-0.3px',
            margin: 0,
          }}
        >
          КупиДевайс
        </Navbar.Brand>

        {/* RIGHT ACTIONS */}
        <Nav className="ms-auto align-items-center gap-2">
          {user.isAuth ? (
            <>
              {user.user.role === 'ADMIN' && (
                <Button
                  variant="link"
                  onClick={() => navigate(ADMIN_ROUTE)}
                  style={{
                    color: '#1a1a1a',
                    fontWeight: 500,
                    fontSize: 14,
                    textDecoration: 'none',
                    padding: '6px 12px',
                  }}
                >
                  Админ
                </Button>
              )}

              <Button
                variant="link"
                onClick={() => navigate(BASKET_ROUTE)}
                style={{
                  color: '#1a1a1a',
                  padding: '6px 8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {/* Cart icon */}
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#1a1a1a"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 01-8 0" />
                </svg>
              </Button>

              <Button
                onClick={logOut}
                style={{
                  background: 'transparent',
                  border: '1px solid #d0d0d0',
                  color: '#1a1a1a',
                  borderRadius: 6,
                  padding: '5px 16px',
                  fontSize: 14,
                  fontWeight: 500,
                }}
              >
                Выйти
              </Button>
            </>
          ) : (
            <Button
              onClick={() => navigate(LOGIN_ROUTE)}
              style={{
                background: '#1a1a1a',
                border: 'none',
                color: '#fff',
                borderRadius: 6,
                padding: '5px 20px',
                fontSize: 14,
                fontWeight: 500,
              }}
            >
              Войти
            </Button>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
});

export default NavBar;
