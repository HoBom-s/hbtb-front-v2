// Author
import type { Author, Tag } from "..";

export interface Article {
  id: string;

  thumbnail: string;

  title: string;

  subtitle: string;

  contents: string;

  tags: Tag[];

  user: Author;

  path: string;

  createdAt: string;

  updatedAt: string;
}
