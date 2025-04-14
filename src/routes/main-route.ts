// main-route.ts
// primary navigation routes

import express from 'express';

import { getIndex } from '../controllers/main-controller.js';

const mainRoute = express.Router();

mainRoute.get('/', getIndex);

export default mainRoute;
