import { Book } from './Book';

export type Author = {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
  books?: Book[];
}
