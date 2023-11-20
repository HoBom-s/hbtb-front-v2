import MDEditor from "@uiw/react-md-editor";

// chakra
import { Box } from "@chakra-ui/react";

interface ArticleDetailProps {
  contents: string;
}

export const ArticleDetail = ({ contents }: ArticleDetailProps) => {
  return (
    <Box w="100%" h="100%" mt="40px">
      <MDEditor.Markdown source={contents} style={{ whiteSpace: "pre-wrap" }} />
    </Box>
  );
};
