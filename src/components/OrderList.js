import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  Heading,
  Input,
  Stack,
  Table,
  TBody,
  THead,
  Td,
  Th,
  Tr,
  useToaster,
  Toaster,
  Modal,
  ModalHeader,
  ModalHeading,
  ModalBody,
  ModalFooter,
  ModalFooterActions
} from '@twilio-paste/core';
import { RefreshIcon } from '@twilio-paste/icons/esm/RefreshIcon';
import { SearchIcon } from '@twilio-paste/icons/esm/SearchIcon';
import { fetchOrders, searchOrders, updateOrderStatus } from '../services/airtableService';
import { AIRTABLE_CONFIG } from '../config/airtable';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [newStatus, setNewStatus] = useState('');
  const toaster = useToaster();

  const loadOrders = async () => {
    setIsLoading(true);
    try {
      const data = await fetchOrders();
      setOrders(data);
    } catch (error) {
      toaster.push({
        variant: 'error',
        message: 'Error al cargar los pedidos'
      });
    }
    setIsLoading(false);
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

    setIsLoading(true);
    try {
      const results = await searchOrders(searchQuery);
      setOrders(results);
    } catch (error) {
      toaster.push({
        variant: 'error',
        message: 'Error al buscar pedidos'
      });
    }
    setIsLoading(false);
  };

  const handleStatusUpdate = async () => {
    if (!selectedOrder || !newStatus) return;

    setIsLoading(true);
    try {
      await updateOrderStatus(selectedOrder.id, newStatus);
      await loadOrders();
      toaster.push({
        variant: 'success',
        message: 'Estado actualizado correctamente'
      });
    } catch (error) {
      toaster.push({
        variant: 'error',
        message: 'Error al actualizar el estado'
      });
    }
    setIsLoading(false);
    setIsModalOpen(false);
  };

  const openStatusModal = (order, status) => {
    setSelectedOrder(order);
    setNewStatus(status);
    setIsModalOpen(true);
  };

  const getStatusButton = (order) => {
    switch (order.status) {
      case AIRTABLE_CONFIG.STATUS.PENDING:
        return (
          <Button
            variant="secondary"
            onClick={() => openStatusModal(order, AIRTABLE_CONFIG.STATUS.IN_PROGRESS)}
          >
            Marcar como En Preparación
          </Button>
        );
      case AIRTABLE_CONFIG.STATUS.IN_PROGRESS:
        return (
          <Button
            variant="secondary"
            onClick={() => openStatusModal(order, AIRTABLE_CONFIG.STATUS.READY)}
          >
            Marcar como Listo para Recoger
          </Button>
        );
      case AIRTABLE_CONFIG.STATUS.READY:
        return (
          <Button
            variant="secondary"
            onClick={() => openStatusModal(order, AIRTABLE_CONFIG.STATUS.DELIVERED)}
          >
            Marcar como Recogido
          </Button>
        );
      default:
        return null;
    }
  };

  return (
    <Box padding="space60">
      <Stack spacing="space60">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Heading as="h1" variant="heading10">
            Pedidos de Audífonos
          </Heading>
          <Button
            variant="secondary"
            onClick={loadOrders}
            loading={isLoading}
          >
            <RefreshIcon decorative />
            Actualizar
          </Button>
        </Box>

        <Box display="flex" gap="space40">
          <Input
            placeholder="Buscar por número de orden, nombre, iniciales o teléfono"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <Box width='10px'>&nbsp;</Box>
          <Button
            variant="secondary"
            onClick={handleSearch}
            loading={isLoading}
          >
            <SearchIcon decorative />
            Buscar
          </Button>
        </Box>
        <span>&nbsp;</span>
        <Card>
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
                  <Td>{getStatusButton(order)}</Td>
                </Tr>
              ))}
            </TBody>
          </Table>
        </Card>
      </Stack>

      <Modal
        isOpen={isModalOpen}
        onDismiss={() => setIsModalOpen(false)}
        size="default"
      >
        <ModalHeader>
          <ModalHeading>Confirmar Cambio de Estado</ModalHeading>
        </ModalHeader>
        <ModalBody>
          ¿Está seguro que desea cambiar el estado del pedido {selectedOrder?.orderNumber} a {newStatus}?
        </ModalBody>
        <ModalFooter>
          <ModalFooterActions>
            <Button
              variant="secondary"
              onClick={() => setIsModalOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              variant="primary"
              onClick={handleStatusUpdate}
              loading={isLoading}
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

export default OrderList; 