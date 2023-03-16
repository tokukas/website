import { Book } from './Book';
import { Image } from './Image';

export type Product = {
  book: Book;
  book_id: string;
  created_at?: string;
  description?: string;
  id: string;
  name: string;
  photos?: Image[];
  price: number;
  sku: string;
  updated_at?: string;
}
