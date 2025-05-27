import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Input,
  Stack,
  Text,
  Table,
  THead,
  TBody,
  Tr,
  Th,
  Td,
  useToaster,
  Toaster,
  Modal,
  ModalHeader,
  ModalHeading,
  ModalBody,
  ModalFooter,
  ModalFooterActions
} from '@twilio-paste/core';
import { fetchOrders, searchOrders, updateOrderStatus } from '../services/airtableService';

const OrdersList = () => {
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const toaster = useToaster();

  const loadOrders = async () => {
    try {
      setLoading(true);
      const data = await fetchOrders();
      setOrders(data);
    } catch (error) {
      toaster.push({
        message: 'Error al cargar las órdenes',
        variant: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
    // eslint-disable-next-line
  }, []);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      loadOrders();
      return;
    }

    try {
      setLoading(true);
      const results = await searchOrders(searchQuery);
      setOrders(results);
    } catch (error) {
      toaster.push({
        message: 'Error al buscar órdenes',
        variant: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (orderId) => {
    try {
      const updatedOrder = await updateOrderStatus(orderId, 'completed');
      setOrders(orders.map(order => 
        order.id === orderId ? updatedOrder : order
      ));
      toaster.push({
        message: 'Estado actualizado correctamente',
        variant: 'success'
      });
    } catch (error) {
      toaster.push({
        message: 'Error al actualizar el estado',
        variant: 'error'
      });
    }
    setShowConfirmModal(false);
  };

  return (
    <Box padding="space60">
      <Stack spacing="space60">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Text as="h1" fontSize="fontSize60">
            Órdenes de Producción
          </Text>
          <Box width="300px">
            <Stack orientation="horizontal" spacing="space30">
              <Input
                placeholder="Buscar por número o teléfono"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button variant="primary" onClick={handleSearch}>
                Buscar
              </Button>
            </Stack>
          </Box>
        </Box>

        {loading ? (
          <Text>Cargando...</Text>
        ) : (
          <Table>
            <THead>
              <Tr>
                <Th>Número de Orden</Th>
                <Th>Cliente</Th>
                <Th>Teléfono</Th>
                <Th>Correo Electrónico</Th>
                <Th>Iniciales</Th>
                <Th>Estado</Th>
                <Th>Última Actualización</Th>
                <Th>Acciones</Th>
              </Tr>
            </THead>
            <TBody>
              {orders.map((order) => (
                <Tr key={order.id}>
                  <Td>{order.orderNumber}</Td>
                  <Td>{order.customerName}</Td>
                  <Td>{order.customerPhone}</Td>
                  <Td>{order.customerEmail}</Td>
                  <Td>{order.customerInitials}</Td>
                  <Td>{order.status}</Td>
                  <Td>{new Date(order.updatedAt).toLocaleString('es-MX')}</Td>
                  <Td>
                    {order.status !== 'completed' && (
                      <Button
                        variant="primary"
                        onClick={() => {
                          setSelectedOrder(order);
                          setShowConfirmModal(true);
                        }}
                      >
                        Marcar como Completado
                      </Button>
                    )}
                  </Td>
                </Tr>
              ))}
            </TBody>
          </Table>
        )}
      </Stack>

      <Modal
        isOpen={showConfirmModal}
        onDismiss={() => setShowConfirmModal(false)}
        size="default"
      >
        <ModalHeader>
          <ModalHeading>Confirmar Actualización</ModalHeading>
        </ModalHeader>
        <ModalBody>
          <Text>
            ¿Está seguro que desea marcar la orden {selectedOrder?.orderNumber} como completada?
          </Text>
        </ModalBody>
        <ModalFooter>
          <ModalFooterActions>
            <Button
              variant="secondary"
              onClick={() => setShowConfirmModal(false)}
            >
              Cancelar
            </Button>
            <Button
              variant="primary"
              onClick={() => handleStatusUpdate(selectedOrder.id)}
            >
              Confirmar
            </Button>
          </ModalFooterActions>
        </ModalFooter>
      </Modal>
      <Toaster />
    </Box>
  );
};

export default OrdersList; 