import { useNavigate } from "react-router-dom";

// chakra
import { Box, Text } from "@chakra-ui/react";

// hooks
import { useFetch } from "@/hooks";

// components
import { RenderProps, ArticleCard } from "@/components";

// apis
import { get } from "@/apis";

// types
import type { Nullable, Article, Tag } from "@/types";

interface ArticleSearchFetchProps {
  searchKeyword: string;
}

interface ArticleSearchResponse {
  foundArticles: Article[];
}

interface ArticleResponse {
  allArticles: Article[];
}

export const ArticleSearchFetch = ({
  searchKeyword,
}: ArticleSearchFetchProps) => {
  const articleSearchResult: Nullable<ArticleSearchResponse> = useFetch<
    string,
    ArticleSearchResponse
  >(get, `/api/v2/articles/search${searchKeyword}`);
  const articles: Nullable<ArticleResponse> = useFetch<string, ArticleResponse>(
    get,
    "/api/v2/articles",
  );

  const searched = (() => {
    if (
      articleSearchResult &&
      articles?.allArticles &&
      articleSearchResult.foundArticles.length === 0
    ) {
      return articles.allArticles.filter((article: Article) =>
        article.tags.find(
          (tag: Tag) => tag.title === searchKeyword.split("=")[1],
        ),
      );
    }

    return articleSearchResult?.foundArticles;
  })();

  const navigate = useNavigate();

  const handleArticleSearchCardClick = (path: string) => {
    navigate(`/post${path}`);
  };

  return (
    <Box>
      <Box
        h="100%"
        py="24px"
        sx={{
          ".search-render-list": {
            display: "flex",
            flexDir: "column",
            gap: 4,
          },
        }}
      >
        {searched ? (
          <RenderProps
            className="search-render-list"
            items={searched || []}
            render={(item: Article) => {
              return (
                <ArticleCard
                  thumbnail={item.thumbnail}
                  title={item.title}
                  subtitle={item.subtitle}
                  authorNickname={item.user.nickname}
                  authorThumbnail={item.user.profileImg}
                  path={item.path}
                  onArticleCardClickEvent={handleArticleSearchCardClick}
                  createdAt={item.createdAt.split("T")[0]}
                />
              );
            }}
          />
        ) : (
          <Box py="30px" minH="calc(100vh - 420px)">
            <Text as="b" fontSize="xl" color="gray.800">
              검색 결과가 존재하지 않습니다.
            </Text>
          </Box>
        )}
      </Box>
    </Box>
  );
};
