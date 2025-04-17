// settings.ts
// configuration object for the application

import dotenv from 'dotenv';
import getIPv4 from '../utils/get-ipv4.js';

dotenv.config();

const PORT = 3000;

const appconfig = {
  name: 'Flashcard Dragon',
  abbreviation: '[FCD]',
  port: PORT,
  url: `http://${getIPv4()}:${PORT}`,

  db: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT),
  },
};

export default appconfig;
