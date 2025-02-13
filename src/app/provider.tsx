import * as React from "react";

import { Provider } from "@/components/ui/provider";

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <Provider>
      <React.Suspense
        fallback={<div className="flex h-screen w-screen items-center justify-center">{"Loading..."}</div>}>
        {children}
      </React.Suspense>
    </Provider>
  );
};
