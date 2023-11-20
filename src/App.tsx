// recoil
import { RecoilRoot } from "recoil";

// chakra
import { ChakraBaseProvider } from "@chakra-ui/react";

// theme
import { theme } from "@/assets/theme";

// routes
import { PublicRouter } from "./routes";

// components
import { GlobalErrorBoundary } from "@/components";

const App = () => {
  return (
    <ChakraBaseProvider theme={theme}>
      <GlobalErrorBoundary>
        <RecoilRoot>
          <PublicRouter />
        </RecoilRoot>
      </GlobalErrorBoundary>
    </ChakraBaseProvider>
  );
};

export default App;
