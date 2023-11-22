import { memo } from "react";

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

interface ArticleCardProps {
  thumbnail: string;

  title: string;

  subtitle: string;

  authorNickname: string;

  authorThumbnail: string;

  path: string;

  createdAt: string;

  onArticleCardClickEvent: (
    title: string,
    subtitle: string,
    thumbnail: string,
    path: string,
  ) => void;
}

export const ArticleCard = memo(
  ({
    thumbnail,
    title,
    subtitle,
    authorNickname,
    authorThumbnail,
    path,
    createdAt,
    onArticleCardClickEvent,
  }: ArticleCardProps) => {
    return (
      <Card
        minW="300px"
        maxW="700px"
        w="100%"
        cursor="pointer"
        onClick={() =>
          onArticleCardClickEvent(title, subtitle, thumbnail, path)
        }
      >
        <CardBody p={0}>
          <Flex flexDir="row" alignItems="center">
            <Image
              src={thumbnail}
              alt={title}
              w="100%"
              minW="200px"
              maxW="280px"
              h="190x"
              maxH="190px"
              fallback={<ImageFallbackSpinner height="190px" />}
            />
            <Stack spacing={4} py={4} px={4} w="100%" minW="100px">
              <Heading size="sm">{title}</Heading>
              <Text>{subtitle}</Text>
              <Flex alignItems="center" gap={2}>
                <Image
                  borderRadius="full"
                  boxSize="36px"
                  src={authorThumbnail}
                />
                <Text as="sub" fontSize="14px">
                  {authorNickname}
                </Text>
              </Flex>
              <Text>{createdAt}</Text>
            </Stack>
          </Flex>
        </CardBody>
      </Card>
    );
  },
);
