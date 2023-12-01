// Author
import type { Author, Tag } from "..";

export interface Article {
  _id: string;

  thumbnail: string;

  title: string;

  subtitle: string;

  contents: string;

  tags: Tag[];

  writers: Author[];

  path: string;

  createdAt: string;

  updatedAt: string;
}
