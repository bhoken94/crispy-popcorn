import { useMemo } from "react";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

// import { ProtectedRoute } from '@/lib/auth';

export const createAppRouter = () =>
  createBrowserRouter([
    {
      path: "/",
      lazy: () =>
        import("./routes/landing").then((module) => ({
          ...module,
          Component: module.default,
        })),
    },
    {
      path: "*",
      lazy: () =>
        import("./routes/not-found").then((module) => ({
          ...module,
          Component: module.default,
        })),
    },
  ]);

export const AppRouter = () => {
  const router = useMemo(() => createAppRouter(), []);

  return <RouterProvider router={router} />;
};
