// Card.ts
// type that represents a single card of a flashcard set

export interface Card {
  id: string;
  set_id: string;
  question: string;
  answer: string;
  created_at: Date | string;
  updated_at: Date | string;
}
