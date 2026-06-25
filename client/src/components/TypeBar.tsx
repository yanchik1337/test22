import { observer } from 'mobx-react-lite';
import React from 'react';
import { useStore } from '../index';

const TypeBar = observer(() => {
  const { device } = useStore();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {device.types.map((type) => {
        const isActive = type.id === device.selectedType?.id;
        return (
          <div
            key={type.id}
            onClick={() => device.setSelectedType(type)}
            style={{
              cursor: 'pointer',
              padding: '9px 14px',
              borderRadius: 6,
              fontSize: 14,
              fontWeight: isActive ? 600 : 400,
              color: isActive ? '#1a1a1a' : '#555',
              background: isActive ? '#f0f0f0' : 'transparent',
              transition: 'background 0.15s, color 0.15s',
              userSelect: 'none',
              borderLeft: isActive
                ? '3px solid #1a1a1a'
                : '3px solid transparent',
            }}
            onMouseEnter={(e) => {
              if (!isActive) {
                (e.currentTarget as HTMLDivElement).style.background =
                  '#f7f7f7';
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive) {
                (e.currentTarget as HTMLDivElement).style.background =
                  'transparent';
              }
            }}
          >
            {type.name}
          </div>
        );
      })}
    </div>
  );
});

export default TypeBar;
