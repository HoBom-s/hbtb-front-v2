import { Suspense, lazy } from "react";

// react-router-dom
import { BrowserRouter, Routes, Route } from "react-router-dom";

// chakra
import { Flex } from "@chakra-ui/react";

// router
import { PrivateRouter } from "..";

// pages
const ArticleMain = lazy(() => import("@/pages/ArticleMainPage"));
const ArticleDetailMain = lazy(() => import("@/pages/ArticleDetailPage"));
const ArticleSearchResultMain = lazy(
  () => import("@/pages/ArticleSearchResultPage"),
);
const AdminLoginMain = lazy(() => import("@/pages/AdminLoginPage"));
const AdminDashBoardPage = lazy(() => import("@/pages/AdminDashboardPage"));
const AdminPublishPage = lazy(() => import("@/pages/AdminPublishPage"));
const AdminEditPage = lazy(() => import("@/pages/AdminEditPage"));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));

// hoc
import { withLayout, withAdminLayout } from "@/hoc";

// components
import { AppSpinner } from "@/components";

const LayoutArticleMain = withLayout(ArticleMain);
const LayoutArticleDetailMain = withLayout(ArticleDetailMain);
const LayoutArticleSearchResultMain = withLayout(ArticleSearchResultMain);
const LayoutAdminDashBoardMain = withAdminLayout(AdminDashBoardPage);
const LayoutAdminPublishMain = withAdminLayout(AdminPublishPage);
const LayoutAdminEditMain = withAdminLayout(AdminEditPage);

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
          <Route path="/post/:path" element={<LayoutArticleDetailMain />} />
          <Route path="/search" element={<LayoutArticleSearchResultMain />} />
          <Route path="/admin" element={<AdminLoginMain />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRouter>
                <LayoutAdminDashBoardMain />
              </PrivateRouter>
            }
          />
          <Route
            path="/publish"
            element={
              <PrivateRouter>
                <LayoutAdminPublishMain />
              </PrivateRouter>
            }
          />
          <Route
            path="/edit"
            element={
              <PrivateRouter>
                <LayoutAdminEditMain />
              </PrivateRouter>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
};
