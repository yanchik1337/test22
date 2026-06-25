import { observer } from 'mobx-react-lite';
import React from 'react';
import { useStore } from '../index';
import DeviceItem from './DeviceItem';

const DeviceList = observer(() => {
  const { device } = useStore();

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))',
        gap: 16,
      }}
    >
      {device.devices.map((d) => (
        <DeviceItem device={d} key={d.id} />
      ))}
    </div>
  );
});

export default DeviceList;
