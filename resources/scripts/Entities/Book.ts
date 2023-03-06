import { Author } from './Author';
import { Publisher } from './Publisher';

export type Book = {
  id: string;
  title: string;
  publisher_id: string;
  year_published: number;
  language_code: string;
  width: number;
  height: number;
  weight: number;
  num_of_pages: number;
  category_id: string;
  isbn: string;
  description: string;
  created_at: string;
  updated_at: string;
  publisher?: Publisher;
  authors?: Author[];
}
