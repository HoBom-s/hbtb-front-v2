import MDEditor from "@uiw/react-md-editor";

// chakra
import { Box, Stack, Image, Text, Flex } from "@chakra-ui/react";

interface ArticleDetailProps {
  contents: string;

  authorThumbnail: string;

  authorNickname: string;

  authorIntroduction: string;
}

export const ArticleDetail = ({
  contents,
  authorThumbnail,
  authorNickname,
  authorIntroduction,
}: ArticleDetailProps) => {
  return (
    <Box w="100%" h="100%" mt="40px">
      <MDEditor.Markdown source={contents} style={{ whiteSpace: "pre-wrap" }} />
      <Stack spacing={2} mt="20px" py={6} px={4}>
        <Flex alignItems="center" gap={2}>
          <Image borderRadius="full" boxSize="40px" src={authorThumbnail} />
          <Box>
            <Text as="sub" display="block">
              {authorNickname}
            </Text>
            <Text as="sub">{authorIntroduction}</Text>
          </Box>
        </Flex>
      </Stack>
    </Box>
  );
};
