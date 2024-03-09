// chakra
import { Box } from "@chakra-ui/react";

// hooks
import { useFetch } from "@/hooks";

// components
import { AdminArticlesTable } from "../Articles/AdminArticlesTable";

// apis
import { get } from "@/apis";

// types
import type { Article, Nullable } from "@/types";

interface ArticleResponse {
  allArticles: Article[];
}

export const AdminArticlesTableFetch = () => {
  const articleResults: Nullable<ArticleResponse> = useFetch<
    string,
    ArticleResponse
  >(get, "/api/v2/articles");

  return (
    <Box>
      {articleResults && (
        <AdminArticlesTable items={articleResults.allArticles} />
      )}
    </Box>
  );
};
