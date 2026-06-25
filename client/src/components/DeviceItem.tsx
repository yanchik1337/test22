import React from 'react';
import { useNavigate } from 'react-router-dom';

import star from '../assets/star.png';
import { DEVICE_ROUTE } from '../utils/consts';
import { useStore } from '..';
import { IDevice } from '../interfaces/deviceInterface/deviceInterface';

interface DeviceItemProps {
  device: IDevice;
}

const DeviceItem: React.FC<DeviceItemProps> = ({ device }) => {
  const navigate = useNavigate();
  const { device: deviceStore } = useStore();

  const currentBrand = deviceStore.brands.find(
    (brand) => brand.id === device.brandId,
  );

  return (
    <div
      onClick={() => navigate(`${DEVICE_ROUTE}/${device.id}`)}
      style={{
        cursor: 'pointer',
        background: '#fff',
        border: '1px solid #ebebeb',
        borderRadius: 10,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        transition: 'box-shadow 0.18s, border-color 0.18s',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.boxShadow = '0 4px 18px rgba(0,0,0,0.10)';
        el.style.borderColor = '#d0d0d0';
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.boxShadow = 'none';
        el.style.borderColor = '#ebebeb';
      }}
    >
      {/* IMAGE */}
      <div
        style={{
          height: 180,
          background: '#f7f7f7',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 16,
        }}
      >
        <img
          src={process.env.REACT_APP_API_URL + device.img}
          alt={device.name}
          style={{
            maxHeight: '100%',
            maxWidth: '100%',
            objectFit: 'contain',
          }}
        />
      </div>

      {/* BODY */}
      <div
        style={{
          padding: '12px 14px 14px',
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          flexGrow: 1,
        }}
      >
        {/* Brand + rating row */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span
            style={{
              fontSize: 11,
              color: '#999',
              textTransform: 'uppercase',
              letterSpacing: '0.4px',
            }}
          >
            {currentBrand?.name}
          </span>
          <span
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 3,
              fontSize: 12,
              color: '#555',
            }}
          >
            {device.raiting ?? 0}
            <img src={star} width={12} height={12} alt="★" />
          </span>
        </div>

        {/* Name */}
        <div
          style={{
            fontSize: 14,
            fontWeight: 500,
            color: '#1a1a1a',
            lineHeight: 1.35,
            minHeight: 38,
          }}
        >
          {device.name}
        </div>

        {/* Price */}
        <div
          style={{
            fontSize: 16,
            fontWeight: 700,
            color: '#1a1a1a',
            marginTop: 'auto',
            paddingTop: 6,
          }}
        >
          {device.price ? `${device.price} ₽` : '—'}
        </div>
      </div>
    </div>
  );
};

export default DeviceItem;
