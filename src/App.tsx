// chakra
import { ChakraBaseProvider } from "@chakra-ui/react";

// theme
import { theme } from "@/assets/theme";

// components
import { GlobalErrorBoundary } from "@/components";

const App = () => {
  return (
    <ChakraBaseProvider theme={theme}>
      <GlobalErrorBoundary>
        <div>HoBom</div>
      </GlobalErrorBoundary>
    </ChakraBaseProvider>
  );
};

export default App;
