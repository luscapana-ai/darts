import { Product } from './types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Pro Tungsten 90% Darts",
    price: 89.99,
    description: "Precision engineered 90% tungsten barrels for the serious professional.",
    image: "https://picsum.photos/400/400?random=1",
    category: "darts"
  },
  {
    id: 2,
    name: "Classic Bristle Board",
    price: 65.00,
    description: "Tournament quality sisal fiber board with staple-free bullseye.",
    image: "https://picsum.photos/400/400?random=2",
    category: "boards"
  },
  {
    id: 4,
    name: "LED Surround Ring",
    price: 120.00,
    description: "Shadow-free illumination for your dartboard setup.",
    image: "https://picsum.photos/400/400?random=4",
    category: "accessories"
  }
];

export const INITIAL_ENCYCLOPEDIA_PROMPT = `
You are a world-renowned expert on the sport of Darts. 
Please write a comprehensive, engaging, and formatted guide about the topic provided. 
Use Markdown for formatting (headers, lists, bold text). 
Keep the tone professional yet accessible to newcomers.
`;