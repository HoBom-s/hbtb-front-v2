import MDEditor from "@uiw/react-md-editor";

// chakra
import { Box, Stack, Image, Text, Flex, Button } from "@chakra-ui/react";

// utils
import { SessionStorage, AUTH_KEY } from "@/utils";

// type
import type { Nullable } from "@/types";

interface ArticleDetailProps {
  _id: string;

  contents: string;

  authorThumbnail: string;

  authorNickname: string;

  authorIntroduction: string;

  onUpdateButtonClickEvent: (_id: string) => void;

  onDeleteButtonClickEvent: (_id: string) => void;
}

export const ArticleDetail = ({
  _id,
  contents,
  authorThumbnail,
  authorNickname,
  authorIntroduction,
  onUpdateButtonClickEvent,
  onDeleteButtonClickEvent,
}: ArticleDetailProps) => {
  const authCheck: Nullable<string> = SessionStorage.getItem(AUTH_KEY);

  return (
    <Box w="100%" h="100%" mt="40px">
      {authCheck && (
        <Flex justifyContent="flex-end" gap="12px" pb="24px">
          <Button
            size="sm"
            colorScheme="orange"
            variant="outline"
            onClick={() => onUpdateButtonClickEvent(_id)}
          >
            EDIT
          </Button>
          <Button
            size="sm"
            colorScheme="orange"
            onClick={() => onDeleteButtonClickEvent(_id)}
          >
            DELETE
          </Button>
        </Flex>
      )}
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
