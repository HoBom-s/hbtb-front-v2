import { Dispatch, SetStateAction } from "react";
import MDEditor from "@uiw/react-md-editor";

// chakra
import { Box } from "@chakra-ui/react";

interface ArticleContentsEditorProps {
  contents: string | undefined;

  setContents: Dispatch<SetStateAction<string | undefined>>;
}

export const ArticleContentsEditor = ({
  contents,
  setContents,
}: ArticleContentsEditorProps) => {
  return (
    <Box w="100%">
      <MDEditor height="80vh" value={contents} onChange={setContents} />
    </Box>
  );
};
