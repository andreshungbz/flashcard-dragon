// set-route.ts
// routes that concern flashcard sets

import express from 'express';

import {
  getCreateSet,
  getDeleteSet,
  getRandomSet,
  getSet,
  getUpdateSet,
  postCreateSet,
  postUpdateSet,
} from '../controllers/set-controller.js';

const setRoute = express.Router();

setRoute.get('/random', getRandomSet);
setRoute.get('/create', getCreateSet);
setRoute.post('/create', postCreateSet);
setRoute.get('/:id/update', getUpdateSet);
setRoute.post('/:id/update', postUpdateSet);
setRoute.get('/:id/delete', getDeleteSet);
setRoute.get('/:id', getSet);

export default setRoute;
