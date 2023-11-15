import { Suspense, lazy } from "react";

// react-router-dom
import { BrowserRouter, Routes, Route } from "react-router-dom";

// chakra
import { Flex } from "@chakra-ui/react";

// pages
const ArticleMain = lazy(() => import("@/pages/ArticleMainPage"));

// hoc
import { withLayout } from "@/hoc";

// components
import { AppSpinner } from "@/components";

const LayoutArticleMain = withLayout(ArticleMain);

const SuspenseSpinnerSection = () => {
  return (
    <Flex w="100%" h="100vh" justifyContent="center" alignItems="center">
      <AppSpinner />
    </Flex>
  );
};

export const PublicRouter = () => {
  return (
    <Suspense fallback={<SuspenseSpinnerSection />}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LayoutArticleMain />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
};
