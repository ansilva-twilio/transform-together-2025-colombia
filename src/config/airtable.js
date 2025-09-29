import Airtable from 'airtable';
import { getInfo } from "../services/transformService.js";

const info = await getInfo();
// Initialize Airtable
const base = new Airtable({
  apiKey: info.AIRTABLE_API_KEY
}).base(info.AIRTABLE_BASE_ID);

export const ORDERS_TABLE = 'Orders';

export const AIRTABLE_CONFIG = {
  BASE_ID: info.AIRTABLE_BASE_ID,
  API_KEY: info.AIRTABLE_API_KEY,
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