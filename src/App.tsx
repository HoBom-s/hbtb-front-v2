import { ChakraProvider } from "@chakra-ui/react";

// theme
import { theme } from "@/assets/theme";

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <div>HoBom</div>
    </ChakraProvider>
  );
};

export default App;
