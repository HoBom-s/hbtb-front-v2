import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

// chakra
import { Box } from "@chakra-ui/react";

// hooks
import { useFetch } from "@/hooks";

// components
import { RenderProps, ArticleCard, Paginator } from "@/components";

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

export const ArticleFetch = () => {
  const PER_PAGE_NUMBER: number = 5;

  const [curPageNumber, setCurPageNumber] = useState<number>(1);

  const articlesResult: Nullable<ArticleFetchResult> = useFetch<
    string,
    ArticleFetchResult
  >(
    get,
    `/api/v2/articles/list?pageNumber=${curPageNumber}&perPage=${PER_PAGE_NUMBER}`,
  );

  const navigate = useNavigate();

  const handleArticleCardClick = (path: string) => {
    navigate(`/post${path}`);
  };

  const handleBackButtonClick = useCallback(() => {
    if (curPageNumber === 1) {
      return;
    }

    setCurPageNumber((prev: number) => prev - 1);
  }, [curPageNumber]);

  const handleFowardButtonClick = useCallback(() => {
    if (articlesResult) {
      if (
        articlesResult.articlesAndPageCount.totalPageCount === curPageNumber
      ) {
        return;
      }
    }

    setCurPageNumber((prev: number) => prev + 1);
  }, [articlesResult, curPageNumber]);

  const handlePageButtonClick = (pageNumber: number) => {
    setCurPageNumber(pageNumber);
  };

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
      {articlesResult && articlesResult?.articlesAndPageCount && (
        <RenderProps
          className="article-render-list"
          items={articlesResult?.articlesAndPageCount.foundArticles || []}
          render={(item: Article) => {
            return (
              <ArticleCard
                thumbnail={item.thumbnail}
                title={item.title}
                subtitle={item.subtitle}
                authorNickname={item.user.nickname}
                authorThumbnail={item.user.profileImg}
                onArticleCardClickEvent={handleArticleCardClick}
                path={item.path}
                createdAt={item.createdAt.split("T")[0]}
              />
            );
          }}
        />
      )}
      <Box mt="40px">
        {articlesResult && (
          <Paginator
            curPageNumber={curPageNumber}
            totalPageNumber={
              articlesResult?.articlesAndPageCount?.totalPageCount
            }
            onBackButtonClickEvent={handleBackButtonClick}
            onFowardButtonClickEvent={handleFowardButtonClick}
            onPageButtonClickEvent={handlePageButtonClick}
          />
        )}
      </Box>
    </Box>
  );
};
