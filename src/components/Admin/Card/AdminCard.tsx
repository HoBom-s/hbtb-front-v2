// chakra
import { Flex, Box, Heading, Text } from "@chakra-ui/react";

// type
import type { ChildrenInterface } from "@/types";

interface AdminCardProps extends ChildrenInterface {
  leftBg: string;

  rightBg: string;

  heading: string;

  subtitle: string;
}

export const AdminCard = ({
  leftBg,
  rightBg,
  heading,
  subtitle,
  children,
}: AdminCardProps) => {
  return (
    <Box>
      <Flex minW="270px" minH="70px" h="100%" w="100%">
        <Box minW="70px" bgColor={leftBg}>
          <Flex justifyContent="center" alignItems="center" h="100%" w="100%">
            <Box fontSize="xl">{children}</Box>
          </Flex>
        </Box>
        <Box bgColor={rightBg} color="white" minW="200px" w="100%" p={3}>
          <Heading fontSize="xl">{heading}</Heading>
          <Text fontSize="md" pt={1}>
            {subtitle}
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};
