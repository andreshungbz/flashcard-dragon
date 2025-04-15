// main-route.ts
// primary navigation routes

import express from 'express';

import { getIndex, getSets } from '../controllers/main-controller.js';

const mainRoute = express.Router();

mainRoute.get('/', getIndex);
mainRoute.get('/sets', getSets);

export default mainRoute;
