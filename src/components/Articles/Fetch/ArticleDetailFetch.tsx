// chakra
import { Box, Heading, Text } from "@chakra-ui/react";

// hooks
import { useFetch } from "@/hooks";

// components
import { ArticleDetail } from "@/components";

// apis
import { get } from "@/apis";

// types
import type { Nullable, Article } from "@/types";

interface ArticleDetailFetchProps {
  path: string;
}

export const ArticleDetailFetch = ({ path }: ArticleDetailFetchProps) => {
  const articleContentsResult: Nullable<Article> = useFetch<string, Article>(
    get,
    `/article/find/${path}`,
  );

  return (
    <Box w="100%" h="100%" py="24px">
      {articleContentsResult && (
        <Box>
          <Heading>{articleContentsResult.title}</Heading>
          <Box pt="22px" pb="30px" display="flex" alignItems="center" gap={4}>
            <Text fontSize="lg">{articleContentsResult.subtitle}</Text>
            <Text as="sub">
              {articleContentsResult.createdAt.split("T")[0]}
            </Text>
          </Box>
          <ArticleDetail
            contents={articleContentsResult.contents}
            authorThumbnail={articleContentsResult.writers[0].profileImg}
            authorNickname={articleContentsResult.writers[0].nickname}
            authorIntroduction={articleContentsResult.writers[0].introduction}
          />
        </Box>
      )}
    </Box>
  );
};
