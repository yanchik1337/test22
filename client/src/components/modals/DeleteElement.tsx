import React, { useState, useContext, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { deleteDeviceAPI } from '../../http/deviceAPI';
import { Context, useStore } from '../..';
import { Dropdown } from 'react-bootstrap';
import { fetchDevices } from '../../http/deviceAPI';
import {
  CreateProps,
  IDevice,
} from '../../interfaces/deviceInterface/deviceInterface';
const DeleteElement = ({ show, onHide }: CreateProps) => {
  const { device } = useStore();
  const [selectedDevice, setSelectedDevice] = useState<IDevice | null>(null);

  useEffect(() => {
    if (show) {
      fetchDevices(null, null, 1, 10).then((data) => {
        device.setDevices(data.rows);
      });
    }
  }, [show]);

  const removeDevice = () => {
    if (!selectedDevice) {
      alert('Пожалуйста, выберите устройство для удаления');
      return;
    }
    if (
      window.confirm(
        `Вы точно хотите удалить устройство "${selectedDevice.name}"?`,
      )
    ) {
      deleteDeviceAPI(selectedDevice.id)
        .then(() => {
          alert('Устройство успешно удалено!');

          device.setDevices(
            device.devices.filter((d) => d.id !== selectedDevice.id),
          );

          setSelectedDevice(null);
          onHide();
        })
        .catch((e) => {
          console.error(e);
          alert('Ошибка при удалении устройства');
        });
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Удалить устройство
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Label className="fw-bold mb-2">
            Выберите устройство из списка:
          </Form.Label>

          <Dropdown className="w-100">
            <Dropdown.Toggle
              variant="outline-dark"
              className="w-100 text-start d-flex justify-content-between align-items-center"
            >
              {selectedDevice
                ? selectedDevice.name
                : 'Нажмите, чтобы выбрать товар'}
            </Dropdown.Toggle>

            <Dropdown.Menu
              className="w-100"
              style={{ maxHeight: '250px', overflowY: 'auto' }}
            >
              {device.devices.map((item) => (
                <Dropdown.Item
                  key={item.id}
                  onClick={() => setSelectedDevice(item)}
                >
                  {item.name} (ID: {item.id})
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>

          {selectedDevice && (
            <div className="mt-3 p-2 bg-light border rounded text-muted style={{ fontSize: '0.9rem' }}">
              Будет удален товар с ID: <strong>{selectedDevice.id}</strong>,
              ценой: <strong>{selectedDevice.price} руб.</strong>
            </div>
          )}
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="outline-secondary" onClick={onHide}>
          Закрыть
        </Button>
        <Button
          variant="danger"
          onClick={removeDevice}
          disabled={!selectedDevice}
        >
          Удалить навсегда
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteElement;
