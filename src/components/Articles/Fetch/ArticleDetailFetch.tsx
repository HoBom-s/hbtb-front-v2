import { useState } from "react";
import { useNavigate } from "react-router-dom";

// chakra
import {
  Box,
  Heading,
  Text,
  Breadcrumb,
  BreadcrumbItem,
} from "@chakra-ui/react";

// hooks
import { useFetch, useModal } from "@/hooks";

// components
import { ArticleDetail, CommonConfirmModal } from "@/components";

// apis
import { del, get } from "@/apis";

// utils
import { SessionStorage, AUTH_KEY } from "@/utils";

// types
import type { Nullable, Article } from "@/types";

interface ArticleDetailFetchProps {
  path: string;
}

interface ArticleResponse {
  foundArticle: Article;
}

export const ArticleDetailFetch = ({ path }: ArticleDetailFetchProps) => {
  const articleContentsResult: Nullable<ArticleResponse> = useFetch<
    string,
    ArticleResponse
  >(get, `/api/v2/articles/list/${path}`);
  const { isModalOpen, handleModalOpenStateChange } = useModal();

  const [articleId, setArticleId] = useState<string>("");

  const navigate = useNavigate();

  const handleUpdateButtonClick = (path: string) => {
    navigate(`/edit`, {
      state: {
        path: path,
      },
    });
  };

  const handleDeleteButtonClick = (_id: string) => {
    setArticleId(_id);

    handleModalOpenStateChange();
  };

  const handleModalOkButtonClick = async () => {
    if (articleId) {
      const deletedId: Nullable<string> = await del(
        `/api/v2/articles/${articleId}`,
        {
          headers: {
            Authorization: `Bearer ${SessionStorage.getItem(AUTH_KEY)}`,
          },
        },
      );

      if (deletedId) {
        setArticleId("");

        navigate("/");
      }
    }
  };

  return (
    <Box w="100%" h="100%" py="24px">
      {articleContentsResult && articleContentsResult.foundArticle && (
        <Box>
          <Heading>{articleContentsResult.foundArticle.title}</Heading>
          <Box pt="22px" pb="30px" display="flex" alignItems="center" gap={4}>
            <Text fontSize="lg">
              {articleContentsResult.foundArticle.subtitle}
            </Text>
            <Text as="sub">
              {articleContentsResult.foundArticle.createdAt.split("T")[0]}
            </Text>
            {SessionStorage.getItem(AUTH_KEY) && (
              <Breadcrumb>
                <BreadcrumbItem>
                  <Text
                    color="teal"
                    cursor="pointer"
                    onClick={() =>
                      handleUpdateButtonClick(
                        articleContentsResult.foundArticle.path,
                      )
                    }
                  >
                    Edit
                  </Text>
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <Text
                    color="red"
                    cursor="pointer"
                    onClick={() =>
                      handleDeleteButtonClick(
                        articleContentsResult.foundArticle.id,
                      )
                    }
                  >
                    Delete
                  </Text>
                </BreadcrumbItem>
              </Breadcrumb>
            )}
          </Box>
          <ArticleDetail
            contents={articleContentsResult.foundArticle.contents}
            authorThumbnail={articleContentsResult.foundArticle.user.profileImg}
            authorNickname={articleContentsResult.foundArticle.user.nickname}
            authorIntroduction={
              articleContentsResult.foundArticle.user.introduction
            }
          />
        </Box>
      )}
      <CommonConfirmModal
        isOpen={isModalOpen}
        title="WARNING"
        contents="Are you sure delete this article ?"
        onModalOkButtonClickEvent={handleModalOkButtonClick}
        onModalCloseButtonClickEvent={handleModalOpenStateChange}
      />
    </Box>
  );
};
