// card-controller.ts
// controllers for card-route.ts

import { Request, Response } from 'express';
import { createCard, deleteCard } from '../models/card-model.js';

import stringConvert from '../utils/string-convert.js';

// creates card and returns it as JSON
export const postCreateCard = async (req: Request, res: Response) => {
  try {
    const setUUID = stringConvert(req.body.set_id);
    const cardQuestion = stringConvert(req.body.card_question);
    const cardAnswer = stringConvert(req.body.card_answer);

    // server-side required check
    if (!cardQuestion || !cardAnswer) {
      res.status(400).json({
        message: 'Required Set/Question/Answer Field Missing',
      });

      return;
    }

    const cardUUID = await createCard(setUUID, cardQuestion, cardAnswer);
    res.json({ id: cardUUID, question: cardQuestion, answer: cardAnswer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '500 Internal Server Error' });
  }
};

// deletes card and returns JSON success
export const postDeleteCard = async (req: Request, res: Response) => {
  try {
    const cardUUID = req.params.id;
    await deleteCard(cardUUID);
    res.json({ message: 'success' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '500 Internal Server Error' });
  }
};
