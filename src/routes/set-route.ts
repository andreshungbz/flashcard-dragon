// set-route.ts
// routes that concern flashcard sets

import express from 'express';

import { getSet } from '../controllers/set-controller.js';

const setRoute = express.Router();

setRoute.get('/:id', getSet);

export default setRoute;
