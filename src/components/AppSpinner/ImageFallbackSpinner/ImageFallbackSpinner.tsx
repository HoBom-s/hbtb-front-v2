// chakra
import { Flex } from "@chakra-ui/react";

// components
import { AppSpinner } from "../..";

interface ImageFallbackSpinnerProps {
  height: string;
}

export const ImageFallbackSpinner = ({ height }: ImageFallbackSpinnerProps) => {
  return (
    <Flex w="100%" h={height} justifyContent="center" alignItems="center">
      <AppSpinner />
    </Flex>
  );
};
