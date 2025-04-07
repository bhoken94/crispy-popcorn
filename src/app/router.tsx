import { useMemo } from "react";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import AppRoot from "./routes/app/root";
import { QueryClient, useQueryClient } from "@tanstack/react-query";
// import { ProtectedRoute } from '@/lib/auth';

const convert = (queryClient: QueryClient) => (m: any) => {
  const { clientLoader, clientAction, default: Component, ...rest } = m;
  return {
    ...rest,
    loader: clientLoader?.(queryClient),
    action: clientAction?.(queryClient),
    Component,
  };
};

export const createAppRouter = (queryClient: QueryClient) =>
  createBrowserRouter([
    {
      path: "/",
      element: <AppRoot />,
      children: [
        {
          path: "/",
          lazy: () => import("./routes/app/home").then(convert(queryClient)),
        },
        {
          path: "movies",
          lazy: () => import("./routes/app/movies/movies").then(convert(queryClient)),
        },
        {
          path: "movie/:id",
          lazy: () => import("./routes/app/movies/movie").then(convert(queryClient)),
        },
      ],
    },
    {
      path: "*",
      lazy: () => import("./routes/not-found").then(convert(queryClient)),
    },
  ]);

export const AppRouter = () => {
  const queryClient = useQueryClient();
  const router = useMemo(() => createAppRouter(queryClient), [queryClient]);

  return <RouterProvider router={router} />;
};
