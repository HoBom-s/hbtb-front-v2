import { Suspense } from "react";

// chakra
import { Box, Text } from "@chakra-ui/react";

// components
import {
  AppSpinner,
  ApiErrorBoundary,
  ApiErrorFallback,
  ArticleRecentFetch,
  ArticleFetch,
} from "..";

export const Articles = () => {
  return (
    <Box>
      <Box>
        <ApiErrorBoundary Fallback={ApiErrorFallback}>
          <Text as="b" fontSize="xl" color="gray.500">
            Recent articles
          </Text>
          <Suspense fallback={<AppSpinner />}>
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
          <Suspense fallback={<AppSpinner />}>
            <Box h="100%">
              <ArticleFetch />
            </Box>
          </Suspense>
        </ApiErrorBoundary>
      </Box>
    </Box>
  );
};
