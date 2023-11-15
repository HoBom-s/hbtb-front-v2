import { Suspense } from "react";

// chakra
import { Box, Text } from "@chakra-ui/react";

// components
import { AppSpinner, ApiErrorBoundary, ApiErrorFallback } from "..";

export const Articles = () => {
  return (
    <Box>
      <Box>
        <ApiErrorBoundary Fallback={ApiErrorFallback}>
          <Suspense fallback={<AppSpinner />}>
            <Text as="b" fontSize="lg" color="gray.500">
              Recent articles
            </Text>
            <Box h="50vh"></Box>
          </Suspense>
        </ApiErrorBoundary>
      </Box>
    </Box>
  );
};
