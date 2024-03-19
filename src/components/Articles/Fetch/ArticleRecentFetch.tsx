import { useNavigate } from "react-router-dom";

// chakra
import { Box } from "@chakra-ui/react";

// hooks
import { useFetch } from "@/hooks";

// components
import { RenderProps, ArticleRecentCard } from "@/components";

// apis
import { get } from "@/apis";

// types
import type { Nullable, Article } from "@/types";

interface ArticleFetchResult {
  articlesAndPageCount: {
    foundArticles: Nullable<Article[]>;
    totalPageCount: number;
  };
}

export const ArticleRecentFetch = () => {
  const PAGE_NUMBER: number = 1;
  const PER_PAGE: number = 3;
  const SORTING: string = "desc";

  const articles: Nullable<ArticleFetchResult> = useFetch<
    string,
    ArticleFetchResult
  >(
    get,
    `/api/v2/articles/list?pageNumber=${PAGE_NUMBER}&perPage=${PER_PAGE}&sorting=${SORTING}`,
  );

  const navigate = useNavigate();

  const handleArticleRecentCardClick = (path: string) => {
    navigate(`/post${path}`);
  };

  return (
    <Box
      py="24px"
      h="100%"
      sx={{
        ".article-cards": {
          display: "grid",
          alignItems: "center",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 6,
          "@media screen and (max-width: 1199px)": {
            gridTemplateColumns: "repeat(2, 1fr)",
          },
          "@media screen and (max-width: 876px)": {
            gridTemplateColumns: "repeat(1, 1fr)",
          },
        },
      }}
    >
      {articles && articles?.articlesAndPageCount && (
        <RenderProps
          className="article-cards"
          items={articles?.articlesAndPageCount?.foundArticles || []}
          render={(item: Article) => {
            return (
              <ArticleRecentCard
                thumbnail={item.thumbnail}
                title={item.title}
                authorNickname={item.user.nickname}
                authorThumbnail={item.user.profileImg}
                path={item.path}
                createdAt={item.createdAt.split("T")[0]}
                onArticleRecentCardClickEvent={handleArticleRecentCardClick}
              />
            );
          }}
        />
      )}
    </Box>
  );
};
