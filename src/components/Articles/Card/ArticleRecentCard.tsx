// chakra
import {
  Card,
  CardBody,
  Image,
  Stack,
  Heading,
  Text,
  Flex,
} from "@chakra-ui/react";

// components
import { ImageFallbackSpinner } from "@/components";

interface ArticleRecentCardProps {
  thumbnail: string;

  title: string;

  authorNickname: string;

  authorThumbnail: string;

  createdAt: string;
}

export const ArticleRecentCard = ({
  thumbnail,
  title,
  authorNickname,
  authorThumbnail,
  createdAt,
}: ArticleRecentCardProps) => {
  return (
    <Card maxW="sm" w="380px" cursor="pointer">
      <CardBody p={0}>
        <Image
          src={thumbnail}
          alt={title}
          w="380px"
          h="226px"
          fallback={<ImageFallbackSpinner height="226px" />}
        />
        <Stack spacing={3} py={6} px={4}>
          <Heading size="sm">{title}</Heading>
          <Flex alignItems="center" gap={2}>
            <Image borderRadius="full" boxSize="40px" src={authorThumbnail} />
            <Text as="sub">{authorNickname}</Text>
          </Flex>
          <Text as="sub">{createdAt}</Text>
        </Stack>
      </CardBody>
    </Card>
  );
};
