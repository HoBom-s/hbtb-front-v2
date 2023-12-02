import { useNavigate } from "react-router-dom";

// chakra
import { Flex, Box, Stack, Text, Button } from "@chakra-ui/react";

// icons
import { FaUser } from "react-icons/fa";

// utils
import { AUTH_KEY, SessionStorage } from "@/utils";

export const Footer = () => {
  const navigate = useNavigate();

  const handleAdminButtonClick = () => {
    if (SessionStorage.getItem(AUTH_KEY)) {
      navigate("/dashboard");
    } else {
      navigate("/admin");
    }
  };

  return (
    <Flex
      h="148px"
      px="80px"
      justifyContent="space-between"
      alignItems="center"
      bg="black"
    >
      <Box>
        <Stack spacing={2}>
          <Text as="b" color="gray.500">
            © HOBOM SERVICE.
          </Text>
          <Box onClick={handleAdminButtonClick}>
            <Flex
              w="80px"
              flex={1}
              alignItems="center"
              color="gray.500"
              gap={2}
              cursor="pointer"
            >
              <FaUser />
              <Text as="b">Admin</Text>
            </Flex>
          </Box>
        </Stack>
      </Box>
      <Box>
        <Button
          variant="outline"
          color="gray.500"
          borderRadius={4}
          borderColor="gray.500"
          sx={{
            "@media screen and (max-width: 499px)": {
              display: "none",
            },
          }}
        >
          <Text as="b">HoBom's Family</Text>
        </Button>
      </Box>
    </Flex>
  );
};
