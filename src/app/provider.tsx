import * as React from "react";

import { Provider as ThemeProvider } from "@/components/ui/provider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ErrorBoundary } from "react-error-boundary";
import { MainErrorFallback } from "@/components/errors/main-error";
import { Flex, Spinner } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { queryConfig } from "@/lib/react-query";
import { AuthLoader } from "@/lib/auth";

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: queryConfig,
      })
  );
  return (
    <ThemeProvider>
      <React.Suspense
        fallback={
          <Flex height={"100vh"} width={"100vw"} justifyContent={"center"} alignItems={"center"}>
            <Spinner color={"blue.500"} size={"xl"} />
          </Flex>
        }>
        <ErrorBoundary FallbackComponent={MainErrorFallback}>
          <QueryClientProvider client={queryClient}>
            {import.meta.env.DEV && <ReactQueryDevtools />}
            <AuthLoader
              renderLoading={() => (
                <Flex height={"100vh"} width={"100vw"} justifyContent={"center"} alignItems={"center"}>
                  <Spinner color={"blue.500"} size={"xl"} />
                </Flex>
              )}>
              {children}
            </AuthLoader>
          </QueryClientProvider>
        </ErrorBoundary>
      </React.Suspense>
    </ThemeProvider>
  );
};
