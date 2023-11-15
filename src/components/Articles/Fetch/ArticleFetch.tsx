// chakra
import { Box, Text } from "@chakra-ui/react";

// hooks
import { useFetch } from "@/hooks";

// components
import { RenderProps } from "@/components";

// apis
import { get } from "@/apis";

// types
import { Nullable } from "@/types";

interface Article {
  _id: string;

  thumbnail: string;

  title: string;

  subtitle: string;

  contents: string;

  tags: string[];

  writers: string[];

  path: string;

  createdAt: string;

  updatedAt: string;
}

export const ArticleFetch = () => {
  const articles: Nullable<Article[]> = useFetch<string, Article[]>(
    get,
    "/article",
  );

  return (
    <Box>
      {articles ? (
        <RenderProps
          className="article-cards"
          items={articles}
          render={(item: Article) => {
            return (
              <Box>
                <Text>{item.title}</Text>
              </Box>
            );
          }}
        />
      ) : (
        <Text as="b" fontSize="lg">
          Cannot find article
        </Text>
      )}
    </Box>
  );
};
