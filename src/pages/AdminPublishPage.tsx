import {
  useState,
  useEffect,
  useLayoutEffect,
  useRef,
  ChangeEvent,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom";

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
import { useForm, useModal } from "@/hooks";

// components
import {
  ArticleContentsEditor,
  ArticleContentsEditorSide,
  CommonModal,
} from "@/components";

// api
import { get, post } from "@/apis";

// utils
import { SessionStorage, AUTH_KEY } from "@/utils";

// types
import type { Article, Nullable, Tag } from "@/types";

interface TagResponse {
  foundTags: Tag[];
}

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
  const { isModalOpen, handleModalOpenStateChange } = useModal();

  const [contents, setContents] = useState<string | undefined>("");
  const [fileValue, setFileValue] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | ArrayBuffer | null>(
    null,
  );
  const [tags, setTags] = useState<Tag[]>([]);
  const [clickedTag, setClickedTag] = useState<Tag[]>([]);
  const [isDesktopMode, setIsDesktopMode] = useState<boolean>(true);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const tagResult: TagResponse = await get("/api/v2/tags");

      setTags(tagResult.foundTags);
    })();
  }, []);

  const handleTumbnailUploadClick = () => {
    fileInputRef.current?.click();
  };

  useLayoutEffect(() => {
    const match = window.matchMedia("(min-width: 1120px)");

    match.addEventListener("change", () => {
      if (match.matches) {
        setIsDesktopMode(true);
      } else {
        setIsDesktopMode(false);
      }
    });
  }, []);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;

    if (target.files && target.files.length) {
      const file = target.files[0];

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setPreviewImage(reader.result);
      };

      setFileValue(file);
    }
  };

  const handleTagItemClick = useCallback(
    (tag: Tag) => {
      const foundTag: Nullable<Tag> = clickedTag.find(
        (cTag: Tag) => cTag.id === tag.id,
      );

      if (foundTag) {
        setClickedTag((prevClickedTag: Tag[]) =>
          prevClickedTag.filter((cTag: Tag) => cTag.id !== tag.id),
        );
      } else {
        setClickedTag((prevClickedTag: Tag[]) => [...prevClickedTag, tag]);
      }
    },
    [clickedTag],
  );

  const handlePostButtonClick = async () => {
    if (!fileValue || !isValidForm || !clickedTag.length || !contents?.length) {
      handleModalOpenStateChange();

      return;
    }

    const formData = new FormData();

    const tagTitles = (() => {
      const titles: string[] = [];

      clickedTag.forEach((tag) => {
        titles.push(tag.title);
      });

      return titles;
    })();

    formData.append("title", formValue.title.value);
    formData.append("thumbnail", fileValue);
    formData.append("subtitle", formValue.subtitle.value);
    formData.append("contents", contents);
    formData.append("tags", tagTitles.join(","));
    formData.append("path", formValue.path.value);

    const result: { createdArticle: Article } = await post(
      "/api/v2/articles",
      formData,
      {
        headers: {
          Authorization: `Bearer ${SessionStorage.getItem(AUTH_KEY)}`,
        },
      },
    );

    if (result.createdArticle.id) {
      navigate("/dashboard");
    } else {
      handleModalOpenStateChange();

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
      <Box w="100%" mt={4}>
        {isDesktopMode ? (
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
              previewImage={previewImage}
              onTagItemClickEvent={handleTagItemClick}
              onTumbnailUploadClickEvent={handleTumbnailUploadClick}
              onFileInputChangeEvent={handleFileChange}
              onPostButtonClickEvent={handlePostButtonClick}
              onFormValueChangeEvent={handleFormValueChange}
            />
          </Flex>
        ) : (
          <Box>
            <ArticleContentsEditorSide
              tags={tags}
              clickedTag={clickedTag}
              fileInputRef={fileInputRef}
              formValue={formValue}
              previewImage={previewImage}
              onTagItemClickEvent={handleTagItemClick}
              onTumbnailUploadClickEvent={handleTumbnailUploadClick}
              onFileInputChangeEvent={handleFileChange}
              onPostButtonClickEvent={handlePostButtonClick}
              onFormValueChangeEvent={handleFormValueChange}
            />
            <Box pt="20px">
              <ArticleContentsEditor
                contents={contents}
                setContents={setContents}
              />
            </Box>
          </Box>
        )}
      </Box>
      <CommonModal
        isOpen={isModalOpen}
        title="WARNING"
        bodyContents="Please check article informations"
        onModalCloseButtonClickEvent={handleModalOpenStateChange}
      />
    </Box>
  );
};

export default AdminPublishPage;
