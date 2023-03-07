import { Book } from './Book';

export type Product = {
  book: Book;
  book_id: string;
  created_at?: string;
  description?: string;
  id: string;
  name: string;
  price: number;
  sku: string;
  updated_at?: string;
}
