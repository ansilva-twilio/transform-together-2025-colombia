import Airtable from 'airtable';
import { AIRTABLE_CONFIG } from '../config/airtable';

const base = new Airtable({ apiKey: AIRTABLE_CONFIG.API_KEY }).base(AIRTABLE_CONFIG.BASE_ID);

export const fetchOrders = async () => {
  try {
    const records = await base(AIRTABLE_CONFIG.TABLE_NAME)
      .select({
        sort: [{ field: AIRTABLE_CONFIG.FIELDS.CREATED_AT, direction: 'desc' }]
      })
      .all();
    return records.map(record => ({
      id: record.id,
      orderNumber: record.get(AIRTABLE_CONFIG.FIELDS.ORDER_NUMBER),
      customerName: record.get(AIRTABLE_CONFIG.FIELDS.CUSTOMER_NAME),
      customerPhone: record.get(AIRTABLE_CONFIG.FIELDS.CUSTOMER_PHONE),
      customerEmail: record.get(AIRTABLE_CONFIG.FIELDS.CUSTOMER_EMAIL),
      customerInitials: record.get(AIRTABLE_CONFIG.FIELDS.CUSTOMER_INITIALS),
      status: record.get(AIRTABLE_CONFIG.FIELDS.STATUS),
      updatedAt: record.get(AIRTABLE_CONFIG.FIELDS.UPDATED_AT),
      createdAt: record.get(AIRTABLE_CONFIG.FIELDS.CREATED_AT)
    }));
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

export const searchOrders = async (query) => {
  try {
    const records = await base(AIRTABLE_CONFIG.TABLE_NAME)
      .select({
        filterByFormula: `OR(FIND('${query}', {${AIRTABLE_CONFIG.FIELDS.CUSTOMER_EMAIL}}), FIND('${query}', {${AIRTABLE_CONFIG.FIELDS.CUSTOMER_INITIALS}}), FIND('${query}', {${AIRTABLE_CONFIG.FIELDS.CUSTOMER_NAME}}), FIND('${query}', {${AIRTABLE_CONFIG.FIELDS.CUSTOMER_PHONE}}), FIND('${query}', {${AIRTABLE_CONFIG.FIELDS.ORDER_NUMBER}}))`
      })
      .all();
    
    return records.map(record => ({
      id: record.id,
      orderNumber: record.get(AIRTABLE_CONFIG.FIELDS.ORDER_NUMBER),
      customerName: record.get(AIRTABLE_CONFIG.FIELDS.CUSTOMER_NAME),
      customerPhone: record.get(AIRTABLE_CONFIG.FIELDS.CUSTOMER_PHONE),
      customerEmail: record.get(AIRTABLE_CONFIG.FIELDS.CUSTOMER_EMAIL),
      customerInitials: record.get(AIRTABLE_CONFIG.FIELDS.CUSTOMER_INITIALS),
      status: record.get(AIRTABLE_CONFIG.FIELDS.STATUS),
      updatedAt: record.get(AIRTABLE_CONFIG.FIELDS.UPDATED_AT),
      createdAt: record.get(AIRTABLE_CONFIG.FIELDS.CREATED_AT)
    }));
  } catch (error) {
    console.error('Error searching orders:', error);
    throw error;
  }
};

export const updateOrderStatus = async (orderId, newStatus) => {
  try {
    const record = await base(AIRTABLE_CONFIG.TABLE_NAME).update(orderId, {
      [AIRTABLE_CONFIG.FIELDS.STATUS]: newStatus
    });
    
    return {
      id: record.id,
      orderNumber: record.get(AIRTABLE_CONFIG.FIELDS.ORDER_NUMBER),
      customerName: record.get(AIRTABLE_CONFIG.FIELDS.CUSTOMER_NAME),
      customerPhone: record.get(AIRTABLE_CONFIG.FIELDS.CUSTOMER_PHONE),
      customerEmail: record.get(AIRTABLE_CONFIG.FIELDS.CUSTOMER_EMAIL),
      customerInitials: record.get(AIRTABLE_CONFIG.FIELDS.CUSTOMER_INITIALS),
      status: record.get(AIRTABLE_CONFIG.FIELDS.STATUS),
      updatedAt: record.get(AIRTABLE_CONFIG.FIELDS.UPDATED_AT),
      createdAt: record.get(AIRTABLE_CONFIG.FIELDS.CREATED_AT)
    };
  } catch (error) {
    console.error('Error updating order status:', error);
    throw error;
  }
}; 