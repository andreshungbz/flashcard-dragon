// set-controller.ts
// controllers for set-route.ts

import { Request, Response } from 'express';
import { createSet, readSet } from '../models/set-model.js';

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
    res.status(500).render('error', { message: '500 Internal Server Error' });
  }
};

export const getCreateSet = (_req: Request, res: Response) => {
  res.render('create-set');
};

export const postCreateSet = async (req: Request, res: Response) => {
  try {
    const { set_name, set_desc } = req.body;
    let setName = set_name ? String(set_name) : '';
    let setDesc = set_desc ? String(set_desc) : '';

    // trim values
    setName = set_name.trim();
    setDesc = set_desc.trim();

    if (!setName || !setDesc) {
      return res
        .status(400)
        .render('error', { message: 'Required Field Missing' });
    }

    const id = await createSet(setName, setDesc);
    res.redirect(`/set/${id}`);
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { message: '500 Internal Server Error' });
  }
};
