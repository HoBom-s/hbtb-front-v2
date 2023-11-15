// chakra
import { Box } from "@chakra-ui/react";

// hooks
import { useFetch } from "@/hooks";

// components
import { RenderProps, ArticleCard } from "@/components";

// apis
import { get } from "@/apis";

// types
import type { Nullable, Article } from "@/types";

interface ArticleFetchResult {
  articles: Nullable<Article[]>;

  totalPageNumber: 2;
}

export const ArticleFetch = () => {
  const PER_PAGE_NUMBER: number = 5;

  const articlesResult: Nullable<ArticleFetchResult> = useFetch<
    string,
    ArticleFetchResult
  >(get, `/article/list?pageNumber=${1}&perPage=${PER_PAGE_NUMBER}`);

  return (
    <Box
      h="100%"
      py="24px"
      sx={{
        ".article-render-list": {
          display: "flex",
          flexDir: "column",
          gap: 4,
        },
      }}
    >
      {articlesResult && (
        <RenderProps
          className="article-render-list"
          items={articlesResult.articles || []}
          render={(item: Article) => {
            return (
              <ArticleCard
                thumbnail={item.thumbnail}
                title={item.title}
                subtitle={item.subtitle}
                authorNickname={item.writers[0].nickname}
                authorThumbnail={item.writers[0].profileImg}
                createdAt={item.createdAt.split("T")[0]}
              />
            );
          }}
        />
      )}
    </Box>
  );
};
