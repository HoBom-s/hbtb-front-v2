import { FormEvent } from "react";
import { useNavigate } from "react-router-dom";

// chakra
import {
  Box,
  Flex,
  Button,
  Text,
  Input,
  FormLabel,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";

// icons
import { MdDashboard } from "react-icons/md";
import { FaPager } from "react-icons/fa";
import { FaHashtag } from "react-icons/fa";

// hooks
import { useModal, useForm } from "@/hooks";

// components
import { CommonChildrenModal } from "..";

// apis
import { post } from "@/apis";

// utils
import { SessionStorage, AUTH_KEY } from "@/utils";

// types
import type { Tag } from "@/types";

export const AdminSidebar = () => {
  const navigate = useNavigate();

  const { isModalOpen, handleModalOpenStateChange } = useModal();
  const { formValue, isValidForm, handleFormValueChange, resetFormValue } =
    useForm({
      title: {
        type: "text",
        value: "",
        placeholder: "태그의 이름을 입력하세요.",
        errorMessage: "태그의 이름이 올바르지 않습니다.",
        isRequired: true,
        validate: (title) => title.length >= 2,
      },
      path: {
        type: "text",
        value: "",
        placeholder: "태그의 경로를 입력하세요.",
        errorMessage: "태그의 경로가 올바르지 않습니다.",
        isRequired: true,
        validate: (path) => path.charAt(0) === "/",
      },
    });

  const handleTagCreateButtonClick = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isValidForm) {
      return;
    }

    const createdTag: Tag = await post(
      "/api/v2/tags",
      {
        title: formValue.title.value,
        path: formValue.path.value,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${SessionStorage.getItem(AUTH_KEY)}`,
        },
      },
    );

    if (!createdTag) {
      return;
    } else {
      resetFormValue();
      handleModalOpenStateChange();

      window.location.reload();
    }
  };

  return (
    <Box
      minH="calc(100vh - 50px)"
      bgColor="#424242"
      minW="220px"
      color="white"
      p="12px"
    >
      <Flex h="100%" flexDir="column">
        <Box flex={1} py="12px">
          <Flex
            w="150px"
            alignItems="center"
            cursor="pointer"
            onClick={() => navigate("/dashboard")}
          >
            <MdDashboard />
            <Text pl="36px">DASHBOARD</Text>
          </Flex>
          <Flex
            w="150px"
            mt="28px"
            alignItems="center"
            cursor="pointer"
            onClick={() => navigate("/")}
          >
            <FaPager />
            <Text pl="36px">TECH PAGE</Text>
          </Flex>
          <Flex
            w="150px"
            mt="28px"
            alignItems="center"
            cursor="pointer"
            onClick={handleModalOpenStateChange}
          >
            <FaHashtag />
            <Text pl="36px">TAG CREATE</Text>
          </Flex>
        </Box>
        <Box>
          <Button
            variant="outline"
            borderColor="teal.100"
            color="teal.100"
            w="100%"
            _hover={{
              background: "none",
            }}
            onClick={() => navigate("/publish")}
          >
            PUBLISH
          </Button>
        </Box>
      </Flex>
      <CommonChildrenModal
        isOpen={isModalOpen}
        title="TAG CREATE"
        onModalCloseButtonClickEvent={handleModalOpenStateChange}
      >
        <form onSubmit={handleTagCreateButtonClick}>
          <FormControl
            isRequired
            isInvalid={!formValue.title.validate(formValue.title.value)}
          >
            <FormLabel>Title</FormLabel>
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
            mt="22px"
            isInvalid={!formValue.path.validate(formValue.path.value)}
          >
            <FormLabel>Path</FormLabel>
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
          <Button
            mt="22px"
            w="100%"
            type="submit"
            variant="outline"
            colorScheme="orange"
          >
            CREATE
          </Button>
        </form>
      </CommonChildrenModal>
    </Box>
  );
};
