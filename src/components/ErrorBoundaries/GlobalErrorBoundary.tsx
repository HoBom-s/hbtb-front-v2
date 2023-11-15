import { Component } from "react";

// chakra
import { Box, Flex, Stack, Text, Button } from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";

// icons
import { FaBomb } from "react-icons/fa";

// types
import type { ChildrenAlias } from "@/types";

interface GlobalErrorBoundaryProps {
  children: ChildrenAlias;
}

interface GlobalErrorBoundaryState {
  hasError: boolean;

  errorInfo: Error | null;
}

export class GlobalErrorBoundary extends Component<
  GlobalErrorBoundaryProps,
  GlobalErrorBoundaryState
> {
  state = {
    hasError: false,
    errorInfo: null,
  };

  constructor(props: GlobalErrorBoundaryProps) {
    super(props);

    this.state = {
      hasError: false,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: unknown) {
    return {
      hasError: true,
      errorInfo: error,
    };
  }

  handleReloadButtonClick() {
    window.location.reload();
  }

  render() {
    if (this.state.hasError) {
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
                Something went wrong! Clear cache and refresh.
              </Text>
              <Button
                display="block"
                colorScheme="orange"
                mt={8}
                rightIcon={<CheckCircleIcon />}
                onClick={this.handleReloadButtonClick}
              >
                CLEAR & RELOAD
              </Button>
            </Box>
          </Stack>
        </Flex>
      );
    }

    return this.props.children;
  }
}
