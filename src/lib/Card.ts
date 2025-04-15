// Card.ts
// type that represents a single card of a flashcard set

export interface Card {
  id: string;
  sequence: number;
  question: string;
  answer: string;
}
