// main-controller.ts
// controllers for main-route.ts

import { Request, Response } from 'express';
import { readAllSets } from '../models/set-model.js';

export const getIndex = (_req: Request, res: Response) => {
  res.render('index');
};

export const getSets = async (_req: Request, res: Response) => {
  try {
    const sets = await readAllSets();

    // convert Date object to formatted date string
    sets.forEach((set) => {
      set.updated_at = set.updated_at.toLocaleString('en-US', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
    });

    res.render('sets', { sets });
  } catch (error) {
    console.error(error);
  }
};
