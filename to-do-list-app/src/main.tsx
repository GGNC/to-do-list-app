import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LoginPage from "./pages/LoginPage";
import LoginForm from "./forms/LoginForm";
import SignUpForm from "./forms/SignUpForm";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
    children: [
      {
        path: "/login",
        element: <LoginForm />,
      },
      {
        path: "/signup",
        element: <SignUpForm />,
      },
    ],
  },
]);
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools />
    </QueryClientProvider>
  </StrictMode>
);
