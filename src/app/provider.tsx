import * as React from "react";

import { Provider as ThemeProvider } from "@/components/ui/provider";
import { ErrorBoundary } from "react-error-boundary";
import { MainErrorFallback } from "@/components/errors/main-error";
import { Flex, Spinner } from "@chakra-ui/react";

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <React.Suspense
      fallback={
        <Flex height={"100vh"} width={"100vw"} justifyContent={"center"} alignItems={"center"}>
          <Spinner color={"blue.500"} size={"xl"} />
        </Flex>
      }>
      <ThemeProvider>
        <ErrorBoundary FallbackComponent={MainErrorFallback}>{children}</ErrorBoundary>
      </ThemeProvider>
    </React.Suspense>
  );
};
