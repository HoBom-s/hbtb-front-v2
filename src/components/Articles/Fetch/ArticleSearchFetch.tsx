import { useNavigate } from "react-router-dom";

// recoil
import { useSetRecoilState } from "recoil";
import { articlePost } from "@/store";

// chakra
import { Box, Text } from "@chakra-ui/react";

// hooks
import { useFetch } from "@/hooks";

// components
import { RenderProps, ArticleCard } from "@/components";

// apis
import { get } from "@/apis";

// types
import type { Nullable, Article } from "@/types";

interface ArticleSearchFetchProps {
  searchKeyword: string;
}

export const ArticleSearchFetch = ({
  searchKeyword,
}: ArticleSearchFetchProps) => {
  const articleSearchResult: Nullable<Article[]> = useFetch<string, Article[]>(
    get,
    `/article/search${searchKeyword}`,
  );

  const setArticlePost = useSetRecoilState(articlePost);

  const navigate = useNavigate();

  const handleArticleSearchCardClick = (
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
        {articleSearchResult && articleSearchResult.length > 0 ? (
          <RenderProps
            className="search-render-list"
            items={articleSearchResult || []}
            render={(item: Article) => {
              return (
                <ArticleCard
                  thumbnail={item.thumbnail}
                  title={item.title}
                  subtitle={item.subtitle}
                  authorNickname={item.writers[0].nickname}
                  authorThumbnail={item.writers[0].profileImg}
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
