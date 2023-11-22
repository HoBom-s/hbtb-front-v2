import { memo } from "react";

// chakra
import { Skeleton, SkeletonText, Box } from "@chakra-ui/react";

export const ArticleCardSkeleton = memo(() => {
  return (
    <Box minW="300px" maxW="500px" w="100%" cursor="pointer">
      <Skeleton width="100%" height="190px" />
      <SkeletonText mt="4" spacing="2" skeletonHeight="2" />
    </Box>
  );
});
