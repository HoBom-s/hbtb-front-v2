import { useNavigate } from "react-router-dom";

// recoil
import { useSetRecoilState } from "recoil";
import { articlePost } from "@/store";

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

export const ArticleRecentFetch = () => {
  const articles: Nullable<Article[]> = useFetch<string, Article[]>(
    get,
    "/article",
  );

  const setArticlePost = useSetRecoilState(articlePost);

  const navigate = useNavigate();

  const handleArticleRecentCardClick = (
    title: string,
    subtitle: string,
    thumbnail: string,
    path: string,
  ) => {
    setArticlePost({
      title: title,
      subtitle: subtitle,
      thumbnail: thumbnail,
    });

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
      {articles && (
        <RenderProps
          className="article-cards"
          items={articles.slice(0, 3)}
          render={(item: Article) => {
            return (
              <ArticleRecentCard
                thumbnail={item.thumbnail}
                title={item.title}
                subtitle={item.subtitle}
                authorNickname={item.writers[0].nickname}
                authorThumbnail={item.writers[0].profileImg}
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
