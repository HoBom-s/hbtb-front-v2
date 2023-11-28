import { Suspense } from "react";

// chakra
import { Box, Flex } from "@chakra-ui/react";

// components
import {
  AdminFetch,
  AdminCardSkeleton,
  ApiErrorBoundary,
  ApiErrorFallback,
  AppSpinner,
  AdminTagCategoryFetch,
  AdminArticlesTableFetch,
} from "@/components";

const AdminDashBoardPage = () => {
  return (
    <Box w="100%">
      <ApiErrorBoundary Fallback={ApiErrorFallback}>
        <Suspense
          fallback={
            <Flex
              w="100%"
              h="70px"
              justifyContent="center"
              alignItems="center"
              gap={3}
              p={3}
            >
              {Array.from({ length: 4 })
                .fill(0)
                .map((_, idx: number) => (
                  <AdminCardSkeleton key={idx} />
                ))}
            </Flex>
          }
        >
          <Box p={3}>
            <AdminFetch />
          </Box>
        </Suspense>
      </ApiErrorBoundary>
      <ApiErrorBoundary Fallback={ApiErrorBoundary}>
        <Suspense
          fallback={
            <Flex
              w="100%"
              h="400px"
              justifyContent="center"
              alignItems="center"
            >
              <AppSpinner />
            </Flex>
          }
        >
          <Box w="100%" maxH="400px" p={3}>
            <AdminTagCategoryFetch />
          </Box>
        </Suspense>
      </ApiErrorBoundary>
      <ApiErrorBoundary Fallback={ApiErrorBoundary}>
        <Suspense
          fallback={
            <Flex
              w="100%"
              h="400px"
              justifyContent="center"
              alignItems="center"
            >
              <AppSpinner />
            </Flex>
          }
        >
          <Box w="100%" mt={2} p={3}>
            <AdminArticlesTableFetch />
          </Box>
        </Suspense>
      </ApiErrorBoundary>
    </Box>
  );
};

export default AdminDashBoardPage;
