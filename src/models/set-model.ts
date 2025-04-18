// set-model.ts
// functions that operate on flashcard sets

import { query } from '../config/database/connection.js';
import { Set } from '../lib/Set.js';
import { Card } from '../lib/Card.js';
import { readCards } from './card-model.js';

// CREATE

export const createSet = async (
  name: string,
  description: string
): Promise<string> => {
  try {
    const result = await query(
      'INSERT INTO set (name, description) VALUES ($1, $2) RETURNING *',
      [name, description]
    );

    if (result.rowCount === 0) {
      throw new Error('[Set Model] Set creation failed');
    }

    const id = result.rows[0].id;
    return id;
  } catch (error) {
    throw error;
  }
};

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
      throw new Error('[Set Model] Set read failed');
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

export const readRandomValidSet = async (): Promise<string> => {
  try {
    const result = await query(
      `
      SELECT s.id
      FROM set s
      WHERE EXISTS (
        SELECT 1 FROM card c WHERE c.set_id = s.id
      )
      ORDER BY RANDOM()
      LIMIT 1
      `,
      []
    );

    return result.rowCount !== 0 ? result.rows[0].id : '';
  } catch (error) {
    throw error;
  }
};

// UPDATE

export const updateSet = async (
  id: string,
  newName: string,
  newDesc: string
) => {
  try {
    const result = await query(
      'UPDATE set SET name = $1, description = $2 WHERE id = $3',
      [newName, newDesc, id]
    );

    if (result.rowCount === 0) {
      throw new Error('[Set Model] Set update failed');
    }
  } catch (error) {
    throw error;
  }
};

// DELETE

export const deleteSet = async (id: string) => {
  try {
    const result = await query('DELETE FROM set WHERE id = $1', [id]);

    if (result.rowCount === 0) {
      throw new Error('[Set Model] Set deletion failed');
    }
  } catch (error) {
    throw error;
  }
};
