import { Suspense, useMemo } from "react";
import { useParams } from "react-router-dom";

// chakra
import { Box } from "@chakra-ui/react";

// components
import {
  ApiErrorBoundary,
  ApiErrorFallback,
  ArticleDetailFetch,
  ArticleDetailSkeleton,
} from "@/components";

const ArticleDetailPage = () => {
  const { path } = useParams();

  const articlePath: string = useMemo(() => path ?? "", [path]);

  return (
    <Box>
      <ApiErrorBoundary Fallback={ApiErrorFallback}>
        <Suspense fallback={<ArticleDetailSkeleton />}>
          <ArticleDetailFetch path={articlePath} />
        </Suspense>
      </ApiErrorBoundary>
    </Box>
  );
};

export default ArticleDetailPage;
