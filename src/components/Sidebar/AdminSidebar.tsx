// chakra
import { Box, Flex, Button, Text } from "@chakra-ui/react";

// icons
import { MdDashboard } from "react-icons/md";
import { FaPager } from "react-icons/fa";
import { CiHashtag } from "react-icons/ci";
import { MdCategory } from "react-icons/md";

export const AdminSidebar = () => {
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
          <Flex w="150px" alignItems="center" cursor="pointer">
            <MdDashboard />
            <Text pl="36px">DASHBOARD</Text>
          </Flex>
          <Flex w="150px" mt="28px" alignItems="center" cursor="pointer">
            <FaPager />
            <Text pl="36px">TECH PAGE</Text>
          </Flex>
          <Flex w="150px" mt="28px" alignItems="center" cursor="pointer">
            <MdCategory />
            <Text pl="36px">CATEGORY</Text>
          </Flex>
          <Flex w="150px" mt="28px" alignItems="center" cursor="pointer">
            <CiHashtag />
            <Text pl="36px">TAG</Text>
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
          >
            PUBLISH
          </Button>
        </Box>
      </Flex>
    </Box>
  );
};
