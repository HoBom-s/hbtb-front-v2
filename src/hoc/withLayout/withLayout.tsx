import { ComponentType } from "react";

// chakra
import { Flex, Box } from "@chakra-ui/react";

// components
import { Header, Footer } from "@/components";

export const withLayout = (Component: ComponentType) => {
  const ComponentWithLayout = () => {
    return (
      <Box>
        <Header />
        <Flex w="100%" justifyContent="center">
          <Box px={10} py="68px" w="100%" minW="300px" maxW="1200px">
            <Component />
          </Box>
        </Flex>
        <Footer />
      </Box>
    );
  };

  return ComponentWithLayout;
};
