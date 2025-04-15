// Set.ts
// type that represents a flashcard set

export interface Set {
  id: string;
  name: string;
  description: string;
  created_at: Date | string;
  updated_at: Date | string;
}
