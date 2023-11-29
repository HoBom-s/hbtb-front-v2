import { useState, useEffect, useRef, ChangeEvent, useCallback } from "react";

// chakra
import {
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";

// hooks
import { useForm } from "@/hooks";

// components
import { ArticleContentsEditor, ArticleContentsEditorSide } from "@/components";

// api
import { get } from "@/apis";

// types
import type { Nullable, Tag } from "@/types";

const AdminPublishPage = () => {
  const { formValue, isValidForm, handleFormValueChange } = useForm({
    title: {
      type: "text",
      value: "",
      placeholder: "게시글의 제목을 입력해 주세요.",
      errorMessage: "게시글의 제목이 올바르지 않습니다.",
      isRequired: true,
      validate: (title) => title.length >= 4,
    },
    subtitle: {
      type: "text",
      value: "",
      placeholder: "게시글의 부제목을 입력해 주세요.",
      errorMessage: "게시글의 부제목이 올바르지 않습니다.",
      isRequired: true,
      validate: (subtitle) => subtitle.length >= 4,
    },
    path: {
      type: "text",
      value: "",
      placeholder: "게시글의 경로를 입력해 주세요.",
      errorMessage: "게시글의 경로가 올바르지 않습니다.",
      isRequired: true,
      validate: (path) => path.charAt(0) === "/",
    },
  });

  const [contents, setContents] = useState<string | undefined>("");
  const [fileValue, setFileValue] = useState<string>("");
  const [tags, setTags] = useState<Tag[]>([]);
  const [clickedTag, setClickedTag] = useState<Tag[]>([]);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    (async () => {
      const tagResult: Tag[] = await get("/tag");

      setTags(tagResult);
    })();
  }, []);

  const handleTumbnailUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setFileValue(value);
  };

  const handleTagItemClick = useCallback(
    (tag: Tag) => {
      const foundTag: Nullable<Tag> = clickedTag.find(
        (cTag: Tag) => cTag._id === tag._id,
      );

      if (foundTag) {
        setClickedTag((prevClickedTag: Tag[]) =>
          prevClickedTag.filter((cTag: Tag) => cTag._id !== tag._id),
        );
      } else {
        setClickedTag((prevClickedTag: Tag[]) => [...prevClickedTag, tag]);
      }
    },
    [clickedTag],
  );

  const handlePostButtonClick = () => {
    if (!fileValue || !isValidForm || !clickedTag.length) {
      return;
    }
  };

  return (
    <Box>
      <Flex justifyContent="space-between" alignItems="center" gap={3}>
        <FormControl
          isRequired
          isInvalid={!formValue.title.validate(formValue.title.value)}
        >
          <FormLabel>Title</FormLabel>
          <Input
            name="title"
            type={formValue.title.type}
            placeholder={formValue.title.placeholder}
            value={formValue.title.value}
            onChange={handleFormValueChange}
          />
          {!formValue.title.validate(formValue.title.value) && (
            <FormErrorMessage>{formValue.title.errorMessage}</FormErrorMessage>
          )}
        </FormControl>
        <FormControl
          isRequired
          isInvalid={!formValue.subtitle.validate(formValue.subtitle.value)}
        >
          <FormLabel>Subtitle</FormLabel>
          <Input
            name="subtitle"
            type={formValue.subtitle.type}
            placeholder={formValue.subtitle.placeholder}
            value={formValue.subtitle.value}
            onChange={handleFormValueChange}
          />
          {!formValue.subtitle.validate(formValue.subtitle.value) && (
            <FormErrorMessage>
              {formValue.subtitle.errorMessage}
            </FormErrorMessage>
          )}
        </FormControl>
      </Flex>
      <Box w="100%" mt={3}>
        <Flex gap={5}>
          <ArticleContentsEditor
            contents={contents}
            setContents={setContents}
          />
          <ArticleContentsEditorSide
            tags={tags}
            clickedTag={clickedTag}
            fileInputRef={fileInputRef}
            formValue={formValue}
            onTagItemClickEvent={handleTagItemClick}
            onTumbnailUploadClickEvent={handleTumbnailUploadClick}
            onFileInputChangeEvent={handleFileChange}
            onPostButtonClickEvent={handlePostButtonClick}
            onFormValueChangeEvent={handleFormValueChange}
          />
        </Flex>
      </Box>
    </Box>
  );
};

export default AdminPublishPage;
