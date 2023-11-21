// recoil
import { atom } from "recoil";

export interface ArticlePost {
  title: string;

  subtitle: string;

  thumbnail: string;
}

export const articlePost = atom<ArticlePost>({
  key: "ARTICLE:POST:STATE",
  default: {
    title: "",
    subtitle: "",
    thumbnail: "",
  },
});
