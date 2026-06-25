import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { createReviewAPI, fetchOneDevice } from '../http/deviceAPI';
import { useStore } from '..';
import { addDeviceToBasketAPI, fetchBasketAPI } from '../http/basketAPI';
import {
  IBasketDevice,
  IDevice,
  IRaiting,
} from '../interfaces/deviceInterface/deviceInterface';
import { BasketDevice } from '../../../src/basketDevice/basketdevice.entity';
import { Button } from 'react-bootstrap';
import { Raiting } from '../../../src/raiting/raiting.entity';

const StarRating = ({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) => {
  const [hovered, setHovered] = useState(0);
  return (
    <div style={{ display: 'flex', gap: 2 }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          onClick={() => onChange(star)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '2px',
            fontSize: 24,
            lineHeight: 1,
            color: (hovered || value) >= star ? '#f5a623' : '#d0d0d0',
            transition: 'color 0.12s',
          }}
        >
          ★
        </button>
      ))}
    </div>
  );
};

const DevicePage = () => {
  const [device, setDevice] = useState<IDevice | null>(null);
  const [rate, setRate] = useState<number>(0);
  const [reviewName, setReviewName] = useState<string>('');
  const [comment, setComment] = useState<string>('');
  const [addedToCart, setAddedToCart] = useState(false);
  const [activeTab, setActiveTab] = useState<'info' | 'specs' | 'reviews'>(
    'info',
  );
  const { device: deviceStore } = useStore();
  const { user } = useStore();
  let { id } = useParams();

  const handleAddToBasket = () => {
    if (user.isAuth) {
      try {
        addDeviceToBasketAPI(device!.id).then(() => {
          deviceStore.appendDeviceToBasket(device!);
          setAddedToCart(true);
          setTimeout(() => setAddedToCart(false), 2500);
        });
      } catch (e) {
        console.log(e as Error);
      }
    } else {
      alert('Необходимо авторизоваться');
    }
  };

  const rateDevice = () => {
    if (!user.isAuth) {
      alert('Необходимо авторизоваться');
      return;
    }

    if (rate === 0 || !reviewName.trim()) {
      alert('Пожалуйста, укажите оценку и заголовок отзыва');
      return;
    }

    const reviewDto = {
      name: String(reviewName),
      rate: Number(rate),
      comment: String(comment),
      deviceId: Number(device!.id),
    };

    createReviewAPI(reviewDto)
      .then((newRaitingFromServer) => {
        if (newRaitingFromServer) {
          const currentRatings = deviceStore._raiting || [];
          deviceStore.setRaiting([...currentRatings, newRaitingFromServer]);

          setRate(0);
          setComment('');
          setReviewName('');
          alert('Отзыв успешно добавлен!');
        }
      })
      .catch((e) => {
        console.error('Ошибка при создании отзыва:', e);
        alert(
          'Не удалось отправить отзыв. Возможно, заголовок уже существует.',
        );
      });
  };

  useEffect(() => {
    fetchOneDevice(Number(id)).then((data) => {
      setDevice(data);

      if (data && data.raitings) {
        deviceStore.setRaiting(data.raitings);
      } else if (data && data.raiting) {
        deviceStore.setRaiting(data.raiting);
      } else {
        deviceStore.setRaiting([]);
      }
    });
  }, [id, deviceStore]);

  if (!device) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '60vh',
        }}
      >
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            border: '3px solid #e8e8e8',
            borderTop: '3px solid #d6001c',
            animation: 'spin .7s linear infinite',
          }}
        />
      </div>
    );
  }

  const formattedPrice = Number(device.price);

  const tabs = [
    { key: 'info', label: 'Описание и фото' },
    { key: 'specs', label: 'Характеристики' },
    { key: 'reviews', label: 'Отзывы' },
  ] as const;

  return (
    <>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        * { box-sizing: border-box; }
        .dp-page { background: #f5f5f5; min-height: 100vh; font-family: Arial, sans-serif; color: #1a1a1a; font-size: 14px; }
        .dp-wrap { max-width: 1140px; margin: 0 auto; padding: 0 16px; }
        .dp-breadcrumb { padding: 10px 0; font-size: 12px; color: #777; border-bottom: 1px solid #e5e5e5; background: #fff; }
        .dp-breadcrumb a { color: #d6001c; text-decoration: none; }
        .dp-breadcrumb a:hover { text-decoration: underline; }
        .dp-main { background: #fff; margin-top: 8px; border: 1px solid #e5e5e5; }
        .dp-header { padding: 20px 24px 0; border-bottom: 1px solid #e5e5e5; }
        .dp-title { font-size: 20px; font-weight: 700; color: #1a1a1a; margin: 0 0 12px; line-height: 1.3; }
        .dp-tabs { display: flex; gap: 0; margin-bottom: -1px; }
        .dp-tab { padding: 10px 18px; font-size: 13px; cursor: pointer; border: 1px solid transparent; border-bottom: none; color: #555; background: none; margin-right: 2px; border-radius: 3px 3px 0 0; transition: all .15s; }
        .dp-tab:hover { color: #d6001c; }
        .dp-tab.active { color: #d6001c; background: #fff; border-color: #e5e5e5; font-weight: 700; }
        .dp-body { display: grid; grid-template-columns: 1fr 280px; gap: 0; }
        .dp-content { padding: 24px; border-right: 1px solid #e5e5e5; }
        .dp-image-wrap { display: flex; justify-content: center; align-items: center; padding: 16px; background: #fafafa; border: 1px solid #eee; border-radius: 4px; margin-bottom: 20px; }
        .dp-image-wrap img { max-width: 280px; max-height: 280px; object-fit: contain; display: block; }
        .dp-specs-title { font-size: 16px; font-weight: 700; margin: 0 0 12px; color: #1a1a1a; }
        .dp-spec-table { width: 100%; border-collapse: collapse; }
        .dp-spec-table tr:nth-child(odd) td { background: #f7f7f7; }
        .dp-spec-table td { padding: 9px 12px; border-bottom: 1px solid #ebebeb; vertical-align: top; font-size: 13px; }
        .dp-spec-table td:first-child { color: #666; width: 44%; }
        .dp-spec-table td:last-child { color: #1a1a1a; font-weight: 500; }
        .dp-rating-box { background: #fafafa; border: 1px solid #eee; border-radius: 4px; padding: 16px; margin-top: 20px; }
        .dp-rating-label { font-size: 13px; color: #555; margin-bottom: 8px; font-weight: 600; }
        .dp-rating-input { width: 100%; padding: 8px 10px; border: 1px solid #d0d0d0; border-radius: 3px; font-size: 13px; margin-top: 10px; outline: none; resize: none; color: #1a1a1a; background: #fff; transition: border-color .15s; }
        .dp-rating-input:focus { border-color: #d6001c; }
        .dp-sidebar { padding: 20px 16px; }
        .dp-price-label { font-size: 11px; color: #888; text-transform: uppercase; letter-spacing: .5px; margin-bottom: 4px; }
        .dp-price { font-size: 28px; font-weight: 700; color: #1a1a1a; line-height: 1; margin-bottom: 4px; }
        .dp-price span { font-size: 16px; font-weight: 400; color: #555; }
        .dp-price-note { font-size: 11px; color: #999; margin-bottom: 16px; }
        .dp-divider { height: 1px; background: #e5e5e5; margin: 16px 0; }
        .dp-add-btn { width: 100%; padding: 12px; border: none; border-radius: 3px; font-size: 14px; font-weight: 700; cursor: pointer; transition: background .15s, transform .1s; letter-spacing: .2px; }
        .dp-add-btn:hover { filter: brightness(0.93); }
        .dp-add-btn:active { transform: scale(.98); }
        .dp-meta { font-size: 11px; color: #888; margin-top: 14px; display: flex; flex-direction: column; gap: 5px; line-height: 1.5; }
        .dp-meta-row { display: flex; align-items: flex-start; gap: 6px; }
        .dp-no-specs { color: #888; font-size: 13px; font-style: italic; padding: 16px 0; }
      `}</style>

      <div className="dp-wrap" style={{ paddingTop: 8, paddingBottom: 24 }}>
        <div className="dp-main">
          <div className="dp-header">
            <h1 className="dp-title">{device.name}</h1>
            <div className="dp-tabs">
              {tabs.map((t) => (
                <button
                  key={t.key}
                  className={`dp-tab${activeTab === t.key ? ' active' : ''}`}
                  onClick={() => setActiveTab(t.key)}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div className="dp-body">
            <div className="dp-content">
              {activeTab === 'info' && (
                <>
                  <div className="dp-image-wrap">
                    <img
                      src={process.env.REACT_APP_API_URL + device.img}
                      alt={device.name}
                    />
                  </div>

                  <div className="dp-rating-box">
                    <div className="dp-rating-label">Оставьте вашу оценку</div>
                    <StarRating value={Number(rate)} onChange={setRate} />

                    <div className="dp-rating-label" style={{ marginTop: 12 }}>
                      Заголовок отзыва (Обязательно)
                    </div>
                    <input
                      type="text"
                      className="dp-rating-input"
                      placeholder="Например: Отличный товар / Быстрая доставка"
                      value={reviewName}
                      onChange={(e) => setReviewName(e.target.value)}
                      style={{ marginBottom: 12 }}
                    />

                    <div className="dp-rating-label">Комментарий</div>
                    <textarea
                      className="dp-rating-input"
                      rows={3}
                      placeholder="Напишите комментарий к оценке…"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />

                    <Button
                      variant="success"
                      className="mt-3 w-100"
                      onClick={rateDevice}
                    >
                      Оставить отзыв
                    </Button>
                  </div>
                </>
              )}

              {activeTab === 'specs' && (
                <div>
                  <h3 className="dp-specs-title">Технические характеристики</h3>
                  {device.deviceInfo && device.deviceInfo.length > 0 ? (
                    <table className="dp-spec-table">
                      <tbody>
                        {device.deviceInfo.map((info) => (
                          <tr key={info.id}>
                            <td>{info.title}</td>
                            <td>{info.description}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <div className="dp-no-specs">
                      Характеристики для этого устройства пока не добавлены
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'reviews' && (
                <div style={{ padding: '16px 0' }}>
                  <h3
                    style={{
                      fontSize: '18px',
                      fontWeight: 700,
                      marginBottom: '16px',
                    }}
                  >
                    Отзывы покупателей ({deviceStore._raiting?.length || 0})
                  </h3>

                  {!deviceStore._raiting ||
                  deviceStore._raiting.length === 0 ? (
                    <div className="dp-no-specs">
                      У этого товара пока нет отзывов. Станьте первым!
                    </div>
                  ) : (
                    deviceStore._raiting.map((review: any) => {
                      console.log(
                        'review.rate:',
                        review.rate,
                        typeof review.rate,
                      );
                      console.log('review:', review);
                      const reviewRate = Number(review.rate);
                      return (
                        <div
                          key={review.id}
                          style={{
                            padding: '16px',
                            border: '1px solid #eee',
                            borderRadius: '4px',
                            marginBottom: '12px',
                            background: '#fafafa',
                          }}
                        >
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              marginBottom: '8px',
                            }}
                          >
                            <strong
                              style={{ fontSize: '15px', color: '#1a1a1a' }}
                            >
                              {review.name}
                            </strong>
                            <span
                              style={{ fontSize: '20px', letterSpacing: '2px' }}
                            >
                              {[1, 2, 3, 4, 5].map((star) => (
                                <span
                                  key={star}
                                  style={{
                                    color:
                                      star <= reviewRate
                                        ? '#f5a623'
                                        : '#d0d0d0',
                                  }}
                                >
                                  ★
                                </span>
                              ))}
                            </span>
                          </div>

                          {review.comment && (
                            <p
                              style={{
                                margin: 0,
                                color: '#555',
                                lineHeight: 1.4,
                              }}
                            >
                              {review.comment}
                            </p>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              )}
            </div>

            <div className="dp-sidebar">
              <div className="dp-price-label">Цена от</div>
              <div className="dp-price">
                {formattedPrice} <span>руб.</span>
              </div>
              <div className="dp-price-note">Розничная цена</div>

              <button
                onClick={handleAddToBasket}
                className="dp-add-btn"
                style={{
                  background: addedToCart ? '#2a9d5c' : '#d6001c',
                  color: '#fff',
                }}
              >
                {addedToCart ? '✓ В корзине' : 'Добавить в корзину'}
              </button>

              <div className="dp-divider" />

              <div className="dp-meta">
                <div className="dp-meta-row">
                  <span>🚚</span>
                  <span>Доставка от 1–3 рабочих дней</span>
                </div>
                <div className="dp-meta-row">
                  <span>🔄</span>
                  <span>Возврат в течение 14 дней</span>
                </div>
                <div className="dp-meta-row">
                  <span>🛡️</span>
                  <span>Официальная гарантия</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DevicePage;
