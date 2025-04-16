// set-route.ts
// routes that concern flashcard sets

import express from 'express';

import {
  getCreateSet,
  getSet,
  postCreateSet,
} from '../controllers/set-controller.js';

const setRoute = express.Router();

setRoute.get('/create', getCreateSet);
setRoute.post('/create', postCreateSet);
setRoute.get('/:id', getSet);

export default setRoute;
