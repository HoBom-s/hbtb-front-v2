import { useCallback, useEffect, useState } from "react";

// chakra
import {
  Box,
  Button,
  TabPanel,
  Text,
  Flex,
  Input,
  FormLabel,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";

// hooks
import { useFetch, useModal, useForm } from "@/hooks";

// components
import {
  AdminTagCategory,
  RenderProps,
  CommonChildrenModal,
  CommonConfirmModal,
} from "@/components";

// apis
import { get, patch, del } from "@/apis";

// types
import type { Tag, Nullable } from "@/types";

// utils
import { AUTH_KEY, SessionStorage } from "@/utils";

export const AdminTagCategoryFetch = () => {
  const tagResult: Nullable<Tag[]> = useFetch<string, Tag[]>(get, "/tag");
  const { isModalOpen, handleModalOpenStateChange } = useModal();
  const confirmModal = useModal();
  const { formValue, isValidForm, handleFormValueChange, resetFormValue } =
    useForm({
      title: {
        type: "text",
        value: "",
        placeholder: "태그의 이름을 입력하세요.",
        errorMessage: "태그의 이름이 올바르지 않습니다.",
        isRequired: true,
        validate: (tagTitle) => tagTitle.length >= 2,
      },
      path: {
        type: "text",
        value: "",
        placeholder: "태그의 경로를 입력하세요.",
        errorMessage: "태그의 경로가 올바르지 않습니다.",
        isRequired: true,
        validate: (tagPath) => tagPath.charAt(0) === "/",
      },
    });

  const [renderItems, setRenderItems] = useState<Tag[]>([]);
  const [selectedTag, setSelectedTag] = useState<Nullable<Tag>>(null);

  useEffect(() => {
    if (tagResult) {
      setRenderItems(tagResult);
    }
  }, [tagResult]);

  const handleSelectedTabChange = useCallback(
    (index: number) => {
      if (index === 0) {
        if (tagResult) {
          setRenderItems(tagResult);
        }
      }
    },
    [tagResult],
  );

  const handleTagItemClick = useCallback(
    (type: string, tag: Tag) => {
      if (type === "update") {
        handleModalOpenStateChange();

        resetFormValue();
      } else if (type === "delete") {
        confirmModal.handleModalOpenStateChange();
      }

      setSelectedTag(tag);
    },
    [confirmModal, handleModalOpenStateChange, resetFormValue],
  );

  const handleTagUpdateSubmitButtonClick = async () => {
    if (!selectedTag || !isValidForm) {
      return;
    }

    const { _id, count } = selectedTag;

    const authToken: Nullable<string> = SessionStorage.getItem(AUTH_KEY);

    if (authToken) {
      const data: Tag = await patch(
        "/tag/update",
        {
          _id: _id,
          title: formValue.title.value,
          path: formValue.path.value,
          count: count,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      );

      if (data._id) {
        const tagUpdateResult: Tag[] = await get("/tag");

        setSelectedTag(null);
        setRenderItems(tagUpdateResult);

        handleModalOpenStateChange();
      }
    }
  };

  const handleTagDeleteOkButtonClick = async () => {
    if (!selectedTag) {
      return;
    }

    const { _id } = selectedTag;

    const data: Nullable<string> = await del(`/tag/delete/${_id}`, {
      headers: {
        Authorization: `Bearer ${SessionStorage.getItem(AUTH_KEY)}`,
      },
    });

    if (data) {
      const tagUpdateResult: Tag[] = await get("/tag");

      setSelectedTag(null);
      setRenderItems(tagUpdateResult);

      confirmModal.handleModalOpenStateChange();
    }
  };

  return (
    <Box>
      <AdminTagCategory onSelectedTabChangeEvent={handleSelectedTabChange}>
        <Box
          sx={{
            ".tag-category-list": {
              height: "420px",
              maxHeight: "300px",
              overflowY: "auto",
            },
          }}
        >
          <RenderProps
            className="tag-category-list"
            items={renderItems}
            render={(item: Tag) => {
              return (
                <TabPanel w="100%">
                  <Flex
                    justifyContent="space-between"
                    alignItems="center"
                    h="100%"
                  >
                    <Box>
                      <Text as="b">{item.title}</Text>
                    </Box>
                    <Box>
                      <Button
                        variant="outline"
                        size="sm"
                        colorScheme="orange"
                        onClick={() => handleTagItemClick("update", item)}
                      >
                        UPDATE
                      </Button>
                      <Button
                        ml="1rem"
                        size="sm"
                        colorScheme="orange"
                        onClick={() => handleTagItemClick("delete", item)}
                      >
                        DELETE
                      </Button>
                    </Box>
                  </Flex>
                </TabPanel>
              );
            }}
          />
        </Box>
      </AdminTagCategory>
      <CommonChildrenModal
        isOpen={isModalOpen}
        title="Tag update"
        onModalCloseButtonClickEvent={handleModalOpenStateChange}
      >
        <FormControl
          isRequired
          isInvalid={!formValue.title.validate(formValue.title.value)}
        >
          <FormLabel>Tag title</FormLabel>
          <Input
            fontSize="sm"
            type={formValue.title.type}
            name="title"
            value={formValue.title.value}
            placeholder={formValue.title.placeholder}
            onChange={handleFormValueChange}
          />
          {!formValue.title.validate(formValue.title.value) && (
            <FormErrorMessage fontSize="sm">
              {formValue.title.errorMessage}
            </FormErrorMessage>
          )}
        </FormControl>
        <FormControl
          isRequired
          pt={3}
          isInvalid={!formValue.path.validate(formValue.path.value)}
        >
          <FormLabel>Tag path</FormLabel>
          <Input
            fontSize="sm"
            type={formValue.path.type}
            name="path"
            value={formValue.path.value}
            placeholder={formValue.path.placeholder}
            onChange={handleFormValueChange}
          />
          {!formValue.path.validate(formValue.path.value) && (
            <FormErrorMessage fontSize="sm">
              {formValue.path.errorMessage}
            </FormErrorMessage>
          )}
        </FormControl>
        <Flex w="100%" justifyContent="flex-end" mt={3}>
          <Button
            variant="outline"
            colorScheme="orange"
            size="sm"
            onClick={handleTagUpdateSubmitButtonClick}
          >
            UPDATE
          </Button>
        </Flex>
      </CommonChildrenModal>
      <CommonConfirmModal
        isOpen={confirmModal.isModalOpen}
        title="Tag delete"
        contents="정말로 태그를 삭제 하시겠습니까?"
        onModalOkButtonClickEvent={handleTagDeleteOkButtonClick}
        onModalCloseButtonClickEvent={confirmModal.handleModalOpenStateChange}
      />
    </Box>
  );
};
