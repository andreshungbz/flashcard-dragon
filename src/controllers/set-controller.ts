// set-controller.ts
// controllers for set-route.ts

import { Request, Response } from 'express';
import {
  createSet,
  deleteSet,
  readSet,
  updateSet,
} from '../models/set-model.js';
import stringConvert from '../utils/string-convert.js';

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
    const setName = stringConvert(req.body.set_name);
    const setDesc = stringConvert(req.body.set_desc);

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

export const getUpdateSet = async (req: Request, res: Response) => {
  try {
    const uuid = req.params.id;
    const result = await readSet(uuid);
    res.render('update-set', { set: result.set });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { message: '500 Internal Server Error' });
  }
};

export const postUpdateSet = async (req: Request, res: Response) => {
  try {
    const uuid = req.params.id;

    const setName = stringConvert(req.body.set_name);
    const setDesc = stringConvert(req.body.set_desc);

    if (!setName || !setDesc) {
      return res
        .status(400)
        .render('error', { message: 'Required Field Missing' });
    }

    await updateSet(uuid, setName, setDesc);
    res.redirect(`/set/${uuid}`);
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { message: '500 Internal Server Error' });
  }
};

export const getDeleteSet = async (req: Request, res: Response) => {
  try {
    const uuid = req.params.id;
    await deleteSet(uuid);
    res.redirect('/sets');
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { message: '500 Internal Server Error' });
  }
};
