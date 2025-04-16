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
      'SELECT * FROM card WHERE set_id = $1 ORDER BY updated_at DESC',
      [setID]
    );

    return result.rows.map((card) => {
      return {
        id: card.id,
        sequence: Number(card.sequence),
        question: card.question,
        answer: card.answer,
      };
    });
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
