// set-model.ts
// functions that operate on flashcard sets

import { query } from '../config/database/connection.js';
import { Set } from '../lib/Set.js';

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

// UPDATE

// DELETE
