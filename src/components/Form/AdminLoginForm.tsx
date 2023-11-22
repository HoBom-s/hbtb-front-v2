import { ChangeEvent, FormEvent, KeyboardEvent } from "react";
import { useNavigate } from "react-router-dom";

// chakra
import {
  Box,
  Text,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
} from "@chakra-ui/react";

// types
import type { Form } from "@/hooks";

interface AdminLoginFormProps {
  formValue: Form;

  onFormKeyDownEvent: (e: KeyboardEvent<HTMLInputElement>) => void;

  onAuthLoginFormChangeEvent: (e: ChangeEvent<HTMLInputElement>) => void;

  onAuthLoginFormSubmitEvent: (e: FormEvent<HTMLFormElement>) => void;
}

export const AdminLoginForm = ({
  formValue,
  onFormKeyDownEvent,
  onAuthLoginFormChangeEvent,
  onAuthLoginFormSubmitEvent,
}: AdminLoginFormProps) => {
  const navigate = useNavigate();

  return (
    <Box minW="320px" boxShadow="md" p="24px" bgColor="white">
      <Box pt="24px" pb="24px">
        <Text as="b" fontSize="lg">
          HoBom Tech Blog
        </Text>
      </Box>
      <form onSubmit={onAuthLoginFormSubmitEvent}>
        <FormControl
          isRequired
          isInvalid={!formValue.username.validate(formValue.username.value)}
        >
          <FormLabel>Username</FormLabel>
          <Input
            fontSize="sm"
            type={formValue.username.type}
            name="username"
            value={formValue.username.value}
            placeholder={formValue.username.placeholder}
            onChange={onAuthLoginFormChangeEvent}
            onKeyDown={onFormKeyDownEvent}
          />
          {!formValue.username.validate(formValue.username.value) && (
            <FormErrorMessage fontSize="sm">
              {formValue.username.errorMessage}
            </FormErrorMessage>
          )}
        </FormControl>
        <FormControl
          isRequired
          mt="22px"
          isInvalid={!formValue.password.validate(formValue.password.value)}
        >
          <Box>
            <FormLabel>Password</FormLabel>
            <Input
              fontSize="sm"
              type={formValue.password.type}
              name="password"
              value={formValue.password.value}
              placeholder={formValue.password.placeholder}
              onChange={onAuthLoginFormChangeEvent}
              onKeyDown={onFormKeyDownEvent}
            />
            {!formValue.password.validate(formValue.password.value) && (
              <FormErrorMessage>
                {formValue.password.errorMessage}
              </FormErrorMessage>
            )}
          </Box>
        </FormControl>
        <Box pt="32px">
          <Button variant="outline" type="submit" colorScheme="orange" w="100%">
            LOGIN
          </Button>
        </Box>
        <Box pt="14px">
          <Button
            type="button"
            colorScheme="orange"
            w="100%"
            onClick={() => navigate("/")}
          >
            HOME
          </Button>
        </Box>
      </form>
    </Box>
  );
};
