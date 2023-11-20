import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

// recoil
import { useSetRecoilState } from "recoil";
import { articlePost } from "@/store";

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
  articles: Nullable<Article[]>;

  totalPageNumber: 2;
}

export const ArticleFetch = () => {
  const PER_PAGE_NUMBER: number = 5;

  const [curPageNumber, setCurPageNumber] = useState<number>(1);

  const articlesResult: Nullable<ArticleFetchResult> = useFetch<
    string,
    ArticleFetchResult
  >(
    get,
    `/article/list?pageNumber=${curPageNumber}&perPage=${PER_PAGE_NUMBER}`,
  );

  const setArticlePost = useSetRecoilState(articlePost);

  const navigate = useNavigate();

  const handleArticleCardClick = (
    title: string,
    subtitle: string,
    path: string,
  ) => {
    setArticlePost({
      title: title,
      subtitle: subtitle,
    });

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
      if (articlesResult.totalPageNumber === curPageNumber) {
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
                path={item.path}
                onArticleCardClickEvent={handleArticleCardClick}
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
            totalPageNumber={articlesResult?.totalPageNumber}
            onBackButtonClickEvent={handleBackButtonClick}
            onFowardButtonClickEvent={handleFowardButtonClick}
            onPageButtonClickEvent={handlePageButtonClick}
          />
        )}
      </Box>
    </Box>
  );
};
