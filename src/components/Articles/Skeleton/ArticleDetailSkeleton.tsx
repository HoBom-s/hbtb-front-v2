import { memo } from "react";

// chakra
import { Box, Skeleton, SkeletonText } from "@chakra-ui/react";

export const ArticleDetailSkeleton = memo(() => {
  return (
    <Box minW="300px" w="100%" maxW="100%">
      <Skeleton width="100%" height="100px" />
      <SkeletonText mt="4" spacing="4" skeletonHeight="4" />
      <SkeletonText mt="4" spacing="4" skeletonHeight="4" />
      <SkeletonText mt="4" spacing="4" skeletonHeight="2" />
      <SkeletonText mt="4" spacing="4" skeletonHeight="2" />
      <SkeletonText mt="4" spacing="4" skeletonHeight="2" />
      <SkeletonText mt="4" spacing="4" skeletonHeight="2" />
    </Box>
  );
});
