import { Suspense } from "react";
import { useNavigate } from "react-router-dom";

// chakra
import { Box, Flex, Text } from "@chakra-ui/react";

// components
import {
  ApiErrorBoundary,
  ApiErrorFallback,
  ArticleRecentFetch,
  ArticleFetch,
  ArticleCardSkeleton,
  TagItemFetch,
  TagItemSkeleton,
} from "..";

// types
import type { Tag } from "@/types";

export const Articles = () => {
  const navigate = useNavigate();

  const handleTagItemClick = (tag: Tag) => {
    const { title } = tag;

    navigate(`/search?keyword=${title}`);
  };

  return (
    <Box>
      <Box>
        <ApiErrorBoundary Fallback={ApiErrorFallback}>
          <Text as="b" fontSize="xl" color="gray.500">
            Recent articles
          </Text>
          <Suspense
            fallback={
              <Box
                sx={{
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
                }}
              >
                {[1, 2, 3].map((num: number) => (
                  <ArticleCardSkeleton key={num} />
                ))}
              </Box>
            }
          >
            <Box h="100%">
              <ArticleRecentFetch />
            </Box>
          </Suspense>
        </ApiErrorBoundary>
      </Box>
      <Box maxW="1200px" mt={14}>
        <ApiErrorBoundary Fallback={ApiErrorFallback}>
          <Text as="b" fontSize="xl" color="gray.500">
            Articles
          </Text>
          <Flex justifyContent="space-between">
            <Suspense
              fallback={
                <Box>
                  {[1, 2, 3, 4, 5].map((num: number) => (
                    <ArticleCardSkeleton key={num} />
                  ))}
                </Box>
              }
            >
              <Box maxW="900px" h="100%">
                <ArticleFetch />
              </Box>
            </Suspense>
            <Box
              sx={{
                "@media screen and (max-width: 899px)": {
                  display: "none",
                },
              }}
            >
              <Suspense
                fallback={
                  <Box py="24px" maxW="300px" gap={2}>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num: number) => (
                      <TagItemSkeleton key={num} />
                    ))}
                  </Box>
                }
              >
                <Box maxW="300px">
                  <TagItemFetch onTagItemClickEvent={handleTagItemClick} />
                </Box>
              </Suspense>
            </Box>
          </Flex>
        </ApiErrorBoundary>
      </Box>
    </Box>
  );
};
