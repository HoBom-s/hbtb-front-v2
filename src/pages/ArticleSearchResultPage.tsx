import { useLocation } from "react-router-dom";

// chakra
import { Box } from "@chakra-ui/react";

// components
import { ArticleSearch } from "@/components";

const ArticleSearchResultPage = () => {
  const location = useLocation();

  const queryString: string = location.search;

  return (
    <Box>
      <ArticleSearch searchKeyword={queryString} />
    </Box>
  );
};

export default ArticleSearchResultPage;
