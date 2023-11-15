// Author
import type { Author } from "..";

export interface Article {
  _id: string;

  thumbnail: string;

  title: string;

  subtitle: string;

  contents: string;

  tags: string[];

  writers: Author[];

  path: string;

  createdAt: string;

  updatedAt: string;
}
