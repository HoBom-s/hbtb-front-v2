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

const AdminPublishPage = () => {
  const { formValue, handleFormValueChange } = useForm({
    title: {
      type: "text",
      value: "",
      placeholder: "게시글의 제목을 입력해 주세요",
      errorMessage: "게시글의 제목이 올바르지 않습니다.",
      isRequired: true,
      validate: (title) => title.length >= 4,
    },
    subtitle: {
      type: "text",
      value: "",
      placeholder: "게시글의 부제목을 입력해 주세요",
      errorMessage: "게시글의 부제목이 올바르지 않습니다.",
      isRequired: true,
      validate: (subtitle) => subtitle.length >= 4,
    },
  });

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
    </Box>
  );
};

export default AdminPublishPage;
