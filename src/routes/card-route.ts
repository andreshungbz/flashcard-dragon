// card-route.ts
// routes that concern flashcards

import express from 'express';
import {
  getUpdateCard,
  postCreateCard,
  postDeleteCard,
  postUpdateCard,
} from '../controllers/card-controller.js';

const cardRoute = express.Router();

cardRoute.post('/create', postCreateCard);
cardRoute.get('/:id/update', getUpdateCard);
cardRoute.post('/:id/update', postUpdateCard);
cardRoute.delete('/:id', postDeleteCard);

export default cardRoute;
