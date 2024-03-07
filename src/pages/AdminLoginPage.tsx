import { KeyboardEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

// chakra
import { Box, Flex } from "@chakra-ui/react";

// hooks
import { useForm, useOverlay } from "@/hooks";

// components
import { AdminLoginForm, CommonModal } from "@/components";

// apis
import { post } from "@/apis";

// utils
import { Validation, SessionStorage, AUTH_KEY } from "@/utils";

interface Auth {
  accessToken: string;
}

const AdminLoginPage = () => {
  const { formValue, isValidForm, handleFormValueChange } = useForm({
    username: {
      type: "text",
      value: "",
      placeholder: "사용자 닉네임을 입력하세요.",
      errorMessage: "사용자 닉네임이 올바르지 않습니다.",
      isRequired: true,
      validate: (username) => username.length >= 2,
    },
    password: {
      type: "password",
      value: "",
      placeholder: "사용자 비밀번호를 입력하세요.",
      errorMessage: "사용자 비밀번호가 올바르지 않습니다.",
      isRequired: true,
      validate: (password) => Validation.isPassword(password),
    },
  });

  const loginAlertOverlay = useOverlay();

  const navigate = useNavigate();

  const handleFormKeyDown = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (isValidForm) {
        //
      }
    }
  };

  const handleAuthLoginFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isValidForm) {
      const { onOpenEvent } = loginAlertOverlay;

      onOpenEvent(({ isOpen, onCloseEvent }) => {
        return (
          <CommonModal
            isOpen={isOpen}
            title="WARNING"
            bodyContents="사용자 입력 정보를 다시 확인해 주세요."
            onModalCloseButtonClickEvent={onCloseEvent}
          />
        );
      });
    }

    const { username, password } = formValue;

    try {
      const authResult: Auth = await post("/api/v2/users/login", {
        nickname: username.value,
        password: password.value,
      });

      SessionStorage.setItem(AUTH_KEY, authResult.accessToken);

      navigate("/dashboard");
    } catch (e: unknown) {
      console.error(e);

      const { onOpenEvent } = loginAlertOverlay;

      onOpenEvent(({ isOpen, onCloseEvent }) => {
        return (
          <CommonModal
            isOpen={isOpen}
            title="WARNING"
            bodyContents="사용자 입력 정보를 다시 확인해 주세요."
            onModalCloseButtonClickEvent={onCloseEvent}
          />
        );
      });
    }
  };

  return (
    <Box>
      <Flex
        flexDir="column"
        justifyContent="center"
        alignItems="center"
        minH="100vh"
        bgColor="gray.50"
      >
        <AdminLoginForm
          formValue={formValue}
          onFormKeyDownEvent={handleFormKeyDown}
          onAuthLoginFormChangeEvent={handleFormValueChange}
          onAuthLoginFormSubmitEvent={handleAuthLoginFormSubmit}
        />
      </Flex>
    </Box>
  );
};

export default AdminLoginPage;
