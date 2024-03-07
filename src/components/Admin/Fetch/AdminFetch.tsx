// chakra
import { Flex } from "@chakra-ui/react";

// icons
import { FaUser, FaNewspaper, FaPager } from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";

// hooks
import { useFetch } from "@/hooks";

// components
import { AdminCard } from "../Card/AdminCard";

// apis
import { get } from "@/apis";

// types
import { Nullable, Auth, Article } from "@/types";

// utils
import { SessionStorage, AUTH_KEY } from "@/utils";

interface ArticleResponse {
  allArticles: Article[];
}

export const AdminFetch = () => {
  const adminResult: Nullable<Auth> = useFetch<string, Nullable<Auth>>(
    get,
    "/api/v2/users",
    {
      headers: {
        Authorization: `Bearer ${SessionStorage.getItem(AUTH_KEY)}`,
      },
    },
  );

  const articles: Nullable<ArticleResponse> = useFetch<
    string,
    Nullable<ArticleResponse>
  >(get, "/api/v2/articles");

  if (!adminResult) {
    return <Flex></Flex>;
  }

  return (
    <Flex
      w="100%"
      gap={4}
      justifyContent="center"
      flexDir="row"
      flexWrap="wrap"
    >
      <AdminCard
        leftBg="rgb(62, 81, 181)"
        rightBg="rgb(80, 100, 181)"
        heading={adminResult.nickname as string}
        subtitle="My Account"
      >
        <FaUser color="white" />
      </AdminCard>
      <AdminCard
        leftBg="rgb(255, 166, 48)"
        rightBg="rgb(255, 160, 122)"
        heading={adminResult.role as string}
        subtitle="Role"
      >
        <MdAdminPanelSettings color="white" />
      </AdminCard>
      <AdminCard
        leftBg="rgb(234, 75, 100)"
        rightBg="rgb(234, 106, 127)"
        heading={String(
          articles?.allArticles.filter(
            (article: Article) =>
              article.user.nickname === adminResult.nickname,
          ).length,
        )}
        subtitle="Articles"
      >
        <FaNewspaper color="white" />
      </AdminCard>
      <AdminCard
        leftBg="rgb(153, 50, 204)"
        rightBg="rgb(148, 0, 211)"
        heading="HoBom Tech Blog"
        subtitle="Service"
      >
        <FaPager color="white" />
      </AdminCard>
    </Flex>
  );
};
