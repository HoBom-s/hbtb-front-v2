import { useState, useEffect, ChangeEvent } from "react";
import { useLocation } from "react-router-dom";

// chakra
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Flex,
  Text,
  Button,
} from "@chakra-ui/react";

// components
import { ArticleContentsEditor } from "@/components";

// apis
import { get, patch } from "@/apis";

import { SessionStorage, AUTH_KEY } from "@/utils";

// types
import type { Article, Nullable } from "@/types";

interface EditForm {
  [key: string]: string;
}

interface ArticleEditResponse {
  foundArticle: Article;
}

const AdminEditPage = () => {
  const { state } = useLocation();
  const { path } = state;

  const [articlePost, setArticlePost] = useState<Nullable<Article>>(null);
  const [formValue, setFormValue] = useState<EditForm>({
    title: "",
    subtitle: "",
    path: "",
    contents: "",
  });
  const [contents, setContents] = useState<string | undefined>("");

  useEffect(() => {
    (async () => {
      const result: Nullable<ArticleEditResponse> = await get(
        `/api/v2/articles/list${path}`,
      );

      if (result?.foundArticle) {
        setArticlePost(result?.foundArticle);
        setFormValue({
          title: result?.foundArticle.title,
          subtitle: result?.foundArticle.subtitle,
        });
        setContents(result?.foundArticle.contents);
      }
    })();
  }, [path]);

  const handleFormValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormValue((prevForm: EditForm) => {
      return {
        ...prevForm,
        [name]: value,
      };
    });
  };

  const handleEditButtonClick = async () => {
    if (articlePost?.id) {
      const authToken: Nullable<string> = SessionStorage.getItem(AUTH_KEY);

      const { id } = articlePost;

      const formData = new FormData();
      formData.append("title", formValue.title);
      formData.append("subtitle", formValue.subtitle);
      formData.append("contents", contents as string);

      await patch(`/api/v2/articles/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      window.location.replace("/dashboard");
    }
  };

  return (
    <Box>
      <Flex pt={4} pb={4} alignItems="center" justifyContent="space-between">
        <Text fontSize="xl" as="b">
          Edit post
        </Text>
        <Button w="120px" colorScheme="orange" onClick={handleEditButtonClick}>
          EDIT
        </Button>
      </Flex>
      <Flex justifyContent="space-between" alignItems="center" gap={3}>
        <FormControl isRequired>
          <FormLabel>Title</FormLabel>
          <Input
            name="title"
            value={formValue.title}
            onChange={handleFormValueChange}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Subtitle</FormLabel>
          <Input
            name="subtitle"
            value={formValue.subtitle}
            onChange={handleFormValueChange}
          />
        </FormControl>
      </Flex>
      <Box w="100%" mt={4}>
        <ArticleContentsEditor contents={contents} setContents={setContents} />
      </Box>
    </Box>
  );
};

export default AdminEditPage;
