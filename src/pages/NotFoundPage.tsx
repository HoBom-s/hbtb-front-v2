// chakra
import { Box, Flex, Stack, Text, Button } from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";

// icons
import { TbError404 } from "react-icons/tb";

const NotFoundPage = () => {
  const handleHomeButtonClick = () => {
    window.location.replace("/");
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
        <Box as={TbError404} fontSize="100px" />
        <Box>
          <Text as="b">Oops…</Text>
          <br />
          <Text as="sub" fontSize="sm">
            Cannot find page ! Please click go back button ...
          </Text>
          <Button
            display="block"
            colorScheme="orange"
            mt={8}
            rightIcon={<CheckCircleIcon />}
            onClick={handleHomeButtonClick}
          >
            HOME
          </Button>
        </Box>
      </Stack>
    </Flex>
  );
};

export default NotFoundPage;
