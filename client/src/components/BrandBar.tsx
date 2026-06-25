import React from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '..';

const BrandBar = observer(() => {
  const { device } = useStore();

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 8,
        padding: '12px 0',
      }}
    >
      {device.brands.map((brand) => {
        const isActive = brand.id === device.selectedBrand?.id;
        return (
          <button
            key={brand.id}
            onClick={() => device.setSelectedBrand(brand)}
            style={{
              cursor: 'pointer',
              padding: '6px 18px',
              borderRadius: 20,
              fontSize: 13,
              fontWeight: isActive ? 600 : 400,
              color: isActive ? '#fff' : '#333',
              background: isActive ? '#1a1a1a' : '#f2f2f2',
              border: 'none',
              transition: 'all 0.15s',
              outline: 'none',
            }}
            onMouseEnter={(e) => {
              if (!isActive) {
                (e.currentTarget as HTMLButtonElement).style.background =
                  '#e5e5e5';
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive) {
                (e.currentTarget as HTMLButtonElement).style.background =
                  '#f2f2f2';
              }
            }}
          >
            {brand.name}
          </button>
        );
      })}
    </div>
  );
});

export default BrandBar;
