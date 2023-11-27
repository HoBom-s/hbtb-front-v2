import { Suspense } from "react";

// chakra
import { Box, Flex } from "@chakra-ui/react";

// components
import {
  AdminFetch,
  AdminCardSkeleton,
  ApiErrorBoundary,
  ApiErrorFallback,
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
            >
              {Array.from({ length: 4 })
                .fill(0)
                .map((_, idx: number) => (
                  <AdminCardSkeleton key={idx} />
                ))}
            </Flex>
          }
        >
          <AdminFetch />
        </Suspense>
      </ApiErrorBoundary>
    </Box>
  );
};

export default AdminDashBoardPage;
