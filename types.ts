export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: 'darts' | 'boards' | 'accessories';
}

export interface CartItem extends Product {
  quantity: number;
}

export enum EncyclopediaTopic {
  HISTORY = 'History of Darts',
  RULES_501 = 'Rules of 501',
  CRICKET = 'How to play Cricket (Darts)',
  TECHNIQUE = 'Throwing Technique & Stance',
  BOARD_SETUP = 'Dartboard Setup & Dimensions',
  TERMINOLOGY = 'Common Darts Terminology'
}

export interface EncyclopediaEntry {
  title: string;
  content: string; // Markdown content
  loading: boolean;
  error?: string;
}