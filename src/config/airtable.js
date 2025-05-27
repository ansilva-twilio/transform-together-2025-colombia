import Airtable from 'airtable';

// Initialize Airtable
const base = new Airtable({
  apiKey: process.env.REACT_APP_AIRTABLE_API_KEY
}).base(process.env.REACT_APP_AIRTABLE_BASE_ID);

export const ORDERS_TABLE = 'Orders';

export const AIRTABLE_CONFIG = {
  BASE_ID: process.env.REACT_APP_AIRTABLE_BASE_ID,
  API_KEY: process.env.REACT_APP_AIRTABLE_API_KEY,
  TABLE_NAME: 'Orders',
  FIELDS: {
    ORDER_NUMBER: 'order_number',
    CUSTOMER_NAME: 'customer_name',
    CUSTOMER_EMAIL: 'customer_email',
    CUSTOMER_PHONE: 'customer_phone_number',
    CUSTOMER_INITIALS: 'customer_initials',
    STATUS: 'status',
    UPDATED_AT: 'updated_at',
    CREATED_AT: 'created_at'
  },
  STATUS: {
    PENDING: 'Pendiente',
    IN_PROGRESS: 'En preparación',
    READY: 'Listo para recoger',
    DELIVERED: 'Recogido en tienda'
  }
};

export default base; 