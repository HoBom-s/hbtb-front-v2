import { ComponentType } from "react";

// chakra
import { Flex, Box } from "@chakra-ui/react";

// components
import { AdminHeader, AdminSidebar } from "@/components";

export const withAdminLayout = (Component: ComponentType) => {
  const ComponentWithAdminLayout = () => {
    return (
      <Box>
        <AdminHeader />
        <Flex w="100%">
          <AdminSidebar />
          <Box
            w="100%"
            minH="calc(100vh - 50px)"
            h="100%"
            overflowY="auto"
            maxH="calc(100vh - 50px)"
            p="12px"
          >
            <Component />
          </Box>
        </Flex>
      </Box>
    );
  };

  return ComponentWithAdminLayout;
};
