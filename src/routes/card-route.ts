// card-route.ts
// routes that concern flashcards

import express from 'express';
import {
  getUpdateCardPage,
  postCard,
  delCard,
  patchCard,
} from '../controllers/card-controller.js';

const cardRoute = express.Router();

// pages
cardRoute.get('/update/:id', getUpdateCardPage);

// operations
cardRoute.post('/create', postCard);
cardRoute.patch('/:id', patchCard);
cardRoute.delete('/:id', delCard);

export default cardRoute;
