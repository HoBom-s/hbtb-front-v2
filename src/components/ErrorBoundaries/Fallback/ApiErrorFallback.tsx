import { useEffect } from "react";

// chakra
import { Box, Flex, Stack, Text, Button } from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";

// axios
import { AxiosError } from "axios";

// icons
import { FaBomb } from "react-icons/fa";

interface ApiErrorFallbackProps {
  error: AxiosError;
}

export const ApiErrorFallback = ({ error }: ApiErrorFallbackProps) => {
  useEffect(() => {
    console.error(error);
  }, []);

  // TODO
  const handleResendRequestClick = () => {
    window.location.reload();
  };

  return (
    <Flex
      height="100vh"
      p={0}
      flex={1}
      position="relative"
      alignItems="center"
      justifyContent="center"
    >
      <Stack
        bg="gray.50"
        width="lg"
        px={6}
        py={6}
        spacing={8}
        direction="row"
        boxShadow="md"
      >
        <Box as={FaBomb} fontSize="100px" />
        <Box>
          <Text as="b">Oops…</Text>
          <br />
          <Text as="sub" fontSize="sm">
            Something went wrong! Please click retry request button
          </Text>
          <Button
            display="block"
            colorScheme="orange"
            mt={8}
            rightIcon={<CheckCircleIcon />}
            onClick={handleResendRequestClick}
          >
            RETRY
          </Button>
        </Box>
      </Stack>
    </Flex>
  );
};
