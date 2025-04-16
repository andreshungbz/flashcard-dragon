// card-route.ts
// routes that concern flashcards

import express from 'express';
import { postCreateCard } from '../controllers/card-controller.js';

const cardRoute = express.Router();

cardRoute.post('/create', postCreateCard);
// cardRoute.get('/:id/update');
// cardRoute.patch('/:id/update');
// cardRoute.delete('/:id/delete');

export default cardRoute;
