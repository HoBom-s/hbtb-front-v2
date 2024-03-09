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

interface ArticleResponse {
  allArticles: Article[];
}

export const ArticleRecentFetch = () => {
  const articles: Nullable<ArticleResponse> = useFetch<string, ArticleResponse>(
    get,
    "/api/v2/articles",
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
      {articles && articles.allArticles && (
        <RenderProps
          className="article-cards"
          items={articles.allArticles
            .sort((a, b) => {
              if (a.createdAt < b.createdAt) return 1;
              else if (a.createdAt > b.createdAt) return -1;
              return 0;
            })
            .slice(0, 3)}
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
