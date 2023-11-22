import { Suspense } from "react";

// chakra
import { Box, Text } from "@chakra-ui/react";

// components
import {
  ApiErrorBoundary,
  ApiErrorFallback,
  ArticleCardSkeleton,
  ArticleSearchFetch,
} from "..";

interface ArticleSearchProps {
  searchKeyword: string;
}

export const ArticleSearch = ({ searchKeyword }: ArticleSearchProps) => {
  return (
    <Box maxW="1200px" mt={14}>
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
          <Box maxW="900px" h="100%">
            <ArticleSearchFetch searchKeyword={searchKeyword} />
          </Box>
        </Suspense>
      </ApiErrorBoundary>
    </Box>
  );
};
