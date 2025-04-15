// set-controller.ts
// controllers for set-route.ts

import { Request, Response } from 'express';
import { readSet } from '../models/set-model.js';

export const getSet = async (req: Request, res: Response) => {
  try {
    const uuid = req.params.id;
    const result = await readSet(uuid);

    result.set.created_at = result.set.created_at.toLocaleString('en-US', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

    result.set.updated_at = result.set.updated_at.toLocaleString('en-US', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

    res.render('set', { result });
  } catch (error) {
    console.error(error);
  }
};
