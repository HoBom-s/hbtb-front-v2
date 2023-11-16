import { Suspense } from "react";

// chakra
import { Box, Text } from "@chakra-ui/react";

// components
import {
  ApiErrorBoundary,
  ApiErrorFallback,
  ArticleRecentFetch,
  ArticleFetch,
  ArticleCardSkeleton,
} from "..";

export const Articles = () => {
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
      <Box mt={14}>
        <ApiErrorBoundary Fallback={ApiErrorFallback}>
          <Text as="b" fontSize="xl" color="gray.500">
            Articles
          </Text>
          <Suspense
            fallback={
              <Box>
                {[1, 2, 3, 4, 5].map((num: number) => (
                  <ArticleCardSkeleton key={num} />
                ))}
              </Box>
            }
          >
            <Box h="100%">
              <ArticleFetch />
            </Box>
          </Suspense>
        </ApiErrorBoundary>
      </Box>
    </Box>
  );
};
