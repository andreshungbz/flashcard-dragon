// card-model.ts
// functions that operate on cards of a flashcard set

import { query } from '../config/database/connection.js';
import { Card } from '../lib/Card.js';

// CREATE

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

// UPDATE

// DELETE
