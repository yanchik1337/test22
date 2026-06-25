import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import TypeBar from '../components/TypeBar';
import BrandBar from '../components/BrandBar';
import DeviceList from '../components/DeviceList';
import Pages from '../components/Pages';

import { fetchBrands, fetchDevices, fetchTypes } from '../http/deviceAPI';
import { useStore } from '..';

const Shop: React.FC = observer(() => {
  const { device } = useStore();

  useEffect(() => {
    fetchTypes().then((data) => device.setTypes(data));
    fetchBrands().then((data) => device.setBrands(data));
    fetchDevices(null, null, 1, 12).then((data) => {
      device.setDevices(data.rows);
      device.setTotalCount(data.count);
    });
  }, []);

  useEffect(() => {
    fetchDevices(
      device.selectedType?.id ?? null,
      device.selectedBrand?.id ?? null,
      device.page,
      device.limit,
    ).then((data) => {
      device.setDevices(data.rows);
      device.setTotalCount(data.count);
    });
  }, [device.page, device.selectedType, device.selectedBrand]);

  return (
    <div style={{ background: '#f5f5f5', minHeight: '100vh' }}>
      <div
        style={{
          display: 'flex',
          maxWidth: 1200,
          margin: '0 auto',
          padding: '24px 16px',
          gap: 24,
          alignItems: 'flex-start',
        }}
      >
        {/* SIDEBAR */}
        <div
          style={{
            width: 200,
            flexShrink: 0,
            background: '#fff',
            borderRadius: 10,
            border: '1px solid #ebebeb',
            padding: '16px 12px',
            position: 'sticky',
            top: 72,
          }}
        >
          <TypeBar />
        </div>

        {/* MAIN CONTENT */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* BRANDS */}
          <div
            style={{
              background: '#fff',
              border: '1px solid #ebebeb',
              borderRadius: 10,
              padding: '12px 18px',
              marginBottom: 16,
            }}
          >
            <BrandBar />
          </div>

          {/* PRODUCTS GRID */}
          <div
            style={{
              background: '#fff',
              border: '1px solid #ebebeb',
              borderRadius: 10,
              padding: '20px 18px',
            }}
          >
            <DeviceList />
          </div>

          {/* PAGINATION */}
          <Pages />
        </div>
      </div>
    </div>
  );
});

export default Shop;
