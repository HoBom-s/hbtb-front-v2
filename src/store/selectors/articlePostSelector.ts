// recoil
import { selector } from "recoil";

// atoms
import { articlePost } from "..";

// atom types
import type { ArticlePost } from "..";

export const articlePostSelector = selector({
  key: "ARTICLE:POST:SELECTOR",
  get: ({ get }) => {
    const articlePostResult: ArticlePost = get(articlePost);

    return articlePostResult;
  },
});
