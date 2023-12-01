import { useState } from "react";
import { useNavigate } from "react-router-dom";

// chakra
import { Box, Heading, Text } from "@chakra-ui/react";

// hooks
import { useFetch, useModal } from "@/hooks";

// components
import { ArticleDetail, CommonConfirmModal, CommonModal } from "@/components";

// apis
import { del, get } from "@/apis";

// utils
import { SessionStorage, AUTH_KEY } from "@/utils";

// types
import type { Nullable, Article } from "@/types";

interface ArticleDetailFetchProps {
  path: string;
}

export const ArticleDetailFetch = ({ path }: ArticleDetailFetchProps) => {
  const articleContentsResult: Nullable<Article> = useFetch<string, Article>(
    get,
    `/article/find/${path}`,
  );
  const { isModalOpen, handleModalOpenStateChange } = useModal();

  const [articleId, setArticleId] = useState<string>("");

  const navigate = useNavigate();

  const handleUpdateButtonClick = (_id: string) => {
    handleModalOpenStateChange();
  };

  const handleDeleteButtonClick = (_id: string) => {
    setArticleId(_id);

    handleModalOpenStateChange();
  };

  const handleModalOkButtonClick = async () => {
    if (articleId) {
      const deletedId: Nullable<string> = await del(
        `/article/delete/${articleId}`,
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
      {articleContentsResult && (
        <Box>
          <Heading>{articleContentsResult.title}</Heading>
          <Box pt="22px" pb="30px" display="flex" alignItems="center" gap={4}>
            <Text fontSize="lg">{articleContentsResult.subtitle}</Text>
            <Text as="sub">
              {articleContentsResult.createdAt.split("T")[0]}
            </Text>
          </Box>
          <ArticleDetail
            _id={articleContentsResult._id}
            contents={articleContentsResult.contents}
            authorThumbnail={articleContentsResult.writers[0].profileImg}
            authorNickname={articleContentsResult.writers[0].nickname}
            authorIntroduction={articleContentsResult.writers[0].introduction}
            onUpdateButtonClickEvent={handleUpdateButtonClick}
            onDeleteButtonClickEvent={handleDeleteButtonClick}
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
      <CommonModal
        isOpen={isModalOpen}
        title="WARNING"
        bodyContents="Not implemented..."
        onModalCloseButtonClickEvent={handleModalOpenStateChange}
      />
    </Box>
  );
};
