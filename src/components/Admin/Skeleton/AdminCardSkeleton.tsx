// chakra
import { Box, Skeleton } from "@chakra-ui/react";

export const AdminCardSkeleton = () => {
  return (
    <Box minW="270px" minH="70px" flex={1}>
      <Skeleton width="100%" height="70px" />
    </Box>
  );
};
