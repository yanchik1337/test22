import React, { useContext, useEffect, useState } from 'react';
import { Container, Card, Row, Col, Image, Button } from 'react-bootstrap';
import { fetchBasketAPI, updateQuantityAPI } from '../http/basketAPI';
import { observer } from 'mobx-react-lite';
import { Context, useStore } from '../index';
import { IAction } from '../interfaces/userInterface/userInterface';
const Basket = observer(() => {
  const { device } = useStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBasketAPI()
      .then((data) => {
        device.setBasket(data);
      })
      .catch((e) => console.log(e))
      .finally(() => setLoading(false));
  }, [device]);

  const handleUpdateQuantity = async ({ deviceId, action }: IAction) => {
    console.log('deviceId:', deviceId, 'action:', action);
    try {
      device.setDeviceQuantity({ deviceId, action });
      const updatedData = await updateQuantityAPI(deviceId, action);
      device.setBasket(updatedData);
    } catch (e: any) {
      if (e.response && e.response.data && e.response.data.e) {
        alert(e.response.data.e);
      } else {
        alert('Не удалось изменить количество товара');
      }
    }
    fetchBasketAPI().then((data) => device.setBasket(data));
  };
  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center mt-5"
        style={{ fontSize: 24 }}
      >
        Загрузка...
      </div>
    );
  }
  const basketDevices = device.basket || [];

  if (!loading && !basketDevices.length) {
    return (
      <div
        className="text-center mt-5"
        style={{ fontSize: 40, fontWeight: 'bold', color: '#6c757d' }}
      >
        Корзина пуста
      </div>
    );
  }
  return (
    <Container className="d-flex flex-column align-items-center mt-5 pb-5">
      <h2 className="mb-4 text-center" style={{ fontWeight: 'bold' }}>
        Корзина
      </h2>

      {basketDevices.map((item, index) => (
        <Card
          key={index}
          className="w-100 p-3 mb-3"
          style={{
            maxWidth: '650px',
            borderRadius: '15px',
            boxShadow: '0px 4px 12px rgba(0,0,0,0.05)',
            border: '1px solid #eee',
          }}
        >
          <Row className="align-items-center">
            <Col xs={4} sm={2} className="d-flex justify-content-center">
              <Image
                src={process.env.REACT_APP_API_URL + item.device.img}
                alt={item.device.name}
                width={80}
                height={80}
                style={{ objectFit: 'contain' }}
              />
            </Col>

            <Col xs={8} sm={4} className="d-flex align-items-center">
              <h5
                className="m-0 text-start"
                style={{ fontSize: '1.1rem', fontWeight: '600' }}
              >
                {item.device.name}
              </h5>
            </Col>

            <Col
              xs={12}
              sm={4}
              className="d-flex align-items-center justify-content-end text-muted fw-bold pt-2 pt-sm-0"
            >
              <span style={{ fontSize: '1.1rem', color: '#28a745' }}>
                Сумма:
                {item.device.price * (item.quantity || 1)}
                руб.
              </span>
            </Col>
            <Col
              xs={12}
              sm={4}
              className="d-flex align-items-center justify-content-end text-muted fw-bold pt-2 pt-sm-0"
            >
              <span style={{ fontSize: '1.1rem', color: 'black' }}>
                Количество: {item.quantity}
              </span>
              <Button
                variant="outline-dark"
                onClick={() =>
                  handleUpdateQuantity({
                    deviceId: item.device?.id,
                    action: 'plus',
                  })
                }
              >
                +
              </Button>
              <Button
                variant="outline-dark"
                onClick={() =>
                  handleUpdateQuantity({
                    deviceId: item.device?.id,
                    action: 'minus',
                  })
                }
              >
                -
              </Button>
            </Col>
          </Row>
        </Card>
      ))}
      <Card
        className="w-100 p-3 mb-3"
        style={{
          maxWidth: '650px',
          borderRadius: '15px',
          boxShadow: '0px 4px 12px rgba(0,0,0,0.05)',
          border: '1px solid #eee',
        }}
      >
        <Row className="m-lg-auto " style={{ fontSize: '20px' }}>
          Общая сумма заказа: {device.totalBasketPrice}
        </Row>
      </Card>
      <Button
        variant={'outline-success'}
        style={{ fontSize: '1.1rem' }}
        className="mt-2"
      >
        Перейти к оплате
      </Button>
    </Container>
  );
});

export default Basket;
