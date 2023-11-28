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

export const AdminArticlesTableFetch = () => {
  const articleResults: Nullable<Article[]> = useFetch<string, Article[]>(
    get,
    "/article",
  );

  return (
    <Box>{articleResults && <AdminArticlesTable items={articleResults} />}</Box>
  );
};
