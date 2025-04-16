// card-model.ts
// functions that operate on cards of a flashcard set

import { query } from '../config/database/connection.js';
import { Card } from '../lib/Card.js';

// CREATE

export const createCard = async (
  setID: string,
  question: string,
  answer: string
): Promise<string> => {
  try {
    const result = await query(
      'INSERT INTO card (set_id, question, answer) VALUES ($1, $2, $3) RETURNING *',
      [setID, question, answer]
    );

    if (result.rowCount === 0) {
      throw new Error('[Card Model] Card creation failed');
    }

    const id = result.rows[0].id;
    return id;
  } catch (error) {
    throw error;
  }
};

// READ

export const readCards = async (setID: string): Promise<Card[]> => {
  try {
    const result = await query(
      'SELECT * FROM card WHERE set_id = $1 ORDER BY updated_at ASC',
      [setID]
    );

    return result.rows.map((card) => {
      return {
        id: card.id,
        set_id: card.set_id,
        question: card.question,
        answer: card.answer,
        created_at: new Date(card.created_at),
        updated_at: new Date(card.updated_at),
      };
    });
  } catch (error) {
    throw error;
  }
};

export const readCard = async (cardID: string): Promise<Card> => {
  try {
    const result = await query('SELECT * FROM card WHERE id = $1', [cardID]);

    if (result.rowCount === 0) {
      throw new Error('[Card Model] Card read failed');
    }

    const card = result.rows[0];
    return {
      id: card.id,
      set_id: card.set_id,
      question: card.question,
      answer: card.answer,
      created_at: new Date(card.created_at),
      updated_at: new Date(card.updated_at),
    };
  } catch (error) {
    throw error;
  }
};

// UPDATE

export const updateCard = async (
  id: string,
  newQuestion: string,
  newAnswer: string
) => {
  try {
    const result = await query(
      'UPDATE card SET question = $1, answer = $2 WHERE id = $3',
      [newQuestion, newAnswer, id]
    );

    if (result.rowCount === 0) {
      throw new Error('[Card Model] Card update failed');
    }
  } catch (error) {
    throw error;
  }
};

// DELETE

export const deleteCard = async (id: string) => {
  try {
    const result = await query('DELETE FROM card WHERE id = $1', [id]);

    if (result.rowCount === 0) {
      throw new Error('[Card Model] Card deletion failed');
    }
  } catch (error) {
    throw error;
  }
};
