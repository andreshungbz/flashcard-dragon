// set-controller.ts
// controllers for set-route.ts

import { Request, Response } from 'express';
import stringConvert from '../utils/string-convert.js';
import datestringConvert from '../utils/datestring-convert.js';

import {
  createSet,
  deleteSet,
  readSet,
  updateSet,
} from '../models/set-model.js';

// renders set page
export const getSet = async (req: Request, res: Response) => {
  try {
    const uuid = req.params.id;
    const result = await readSet(uuid);

    // convert date properties to strings
    datestringConvert(result.set);

    res.render('set', { result });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { message: '500 Internal Server Error' });
  }
};

// renders create set page
export const getCreateSet = (_req: Request, res: Response) => {
  res.render('create-set');
};

// creates set in database and redirects to set page
export const postCreateSet = async (req: Request, res: Response) => {
  try {
    const setName = stringConvert(req.body.set_name);
    const setDesc = stringConvert(req.body.set_desc);

    // server-side required check
    if (!setName || !setDesc) {
      return res.status(400).render('error', {
        message: 'Required Name/Description Field Missing',
      });
    }

    const id = await createSet(setName, setDesc);
    res.redirect(`/set/${id}`);
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { message: '500 Internal Server Error' });
  }
};

// renders update set page
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

// updates set in database and redirects to set page
export const postUpdateSet = async (req: Request, res: Response) => {
  try {
    const uuid = req.params.id;

    const setName = stringConvert(req.body.set_name);
    const setDesc = stringConvert(req.body.set_desc);

    // server-side required check
    if (!setName || !setDesc) {
      return res.status(400).render('error', {
        message: 'Required Name/Description Field Missing',
      });
    }

    await updateSet(uuid, setName, setDesc);
    res.redirect(`/set/${uuid}`);
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { message: '500 Internal Server Error' });
  }
};

// deletes set from database and redirects to sets page
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
