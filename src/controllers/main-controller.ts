// main-controller.ts
// controllers for main-route.ts

import { Request, Response } from 'express';
import datestringConvert from '../utils/datestring-convert.js';

import { readAllSets } from '../models/set-model.js';

// renders home page
export const getIndex = (_req: Request, res: Response) => {
  res.render('index');
};

// renders sets page
export const getSets = async (_req: Request, res: Response) => {
  try {
    const sets = await readAllSets();

    if (sets.length === 0) {
      return res.render('error', { message: 'No Flashcard Sets Yet!' });
    }

    // convert date properties to strings
    sets.forEach((set) => {
      datestringConvert(set);
    });

    res.render('sets', { sets });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { message: '500 Internal Server Error' });
  }
};
