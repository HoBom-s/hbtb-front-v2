// recoil
import { atom } from "recoil";

export interface ArticlePost {
  title: string;

  subtitle: string;
}

export const articlePost = atom<ArticlePost>({
  key: "ARTICLE:POST:STATE",
  default: {
    title: "",
    subtitle: "",
  },
});
