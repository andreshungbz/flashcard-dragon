// set-route.ts
// routes that concern flashcard sets

import express from 'express';

import {
  getCreateSetPage,
  delSet,
  getRandomSetStudy,
  getSet,
  getUpdateSetPage,
  postSet,
  patchSet,
} from '../controllers/set-controller.js';

const setRoute = express.Router();

// pages
setRoute.get('/create', getCreateSetPage);
setRoute.get('/random', getRandomSetStudy);
setRoute.get('/update/:id', getUpdateSetPage);

// operations
setRoute.post('/create', postSet);
setRoute.patch('/:id', patchSet);
setRoute.delete('/:id', delSet);

setRoute.get('/:id', getSet);

export default setRoute;
