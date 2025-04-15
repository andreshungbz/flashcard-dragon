// set-model.ts
// functions that operate on flashcard sets

import { query } from '../config/database/connection.js';
import { Set } from '../lib/Set.js';
import { Card } from '../lib/Card.js';
import { readCards } from './card-model.js';

// CREATE

// READ

export const readAllSets = async (): Promise<Set[]> => {
  try {
    const result = await query(
      'SELECT * FROM set ORDER BY updated_at DESC',
      []
    );

    return result.rows.map((set) => {
      return {
        id: set.id,
        name: set.name,
        description: set.description,
        created_at: new Date(set.created_at),
        updated_at: new Date(set.updated_at),
      };
    });
  } catch (error) {
    throw error;
  }
};

export const readSet = async (
  uuid: string
): Promise<{ set: Set; cards: Card[] }> => {
  try {
    const result = await query('SELECT * FROM set WHERE id = $1', [uuid]);

    if (result.rowCount === 0) {
      throw new Error('Set with specified ID does not exist.');
    }

    const set = result.rows[0];
    const cards = await readCards(set.id);

    return {
      set: {
        id: set.id,
        name: set.name,
        description: set.description,
        created_at: new Date(set.created_at),
        updated_at: new Date(set.updated_at),
      },
      cards,
    };
  } catch (error) {
    throw error;
  }
};

// UPDATE

// DELETE
