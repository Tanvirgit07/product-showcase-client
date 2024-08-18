import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Roots/Root.jsx";
import Products from "./Pages/Products.jsx";
import Register from "./Pages/Register.jsx";
import Login from "./Pages/Login.jsx";
import AuthProvider from "./Provider/AuthProvider.jsx";
import AddItems from "./Pages/AddItems.jsx";

import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import Users from "./Pages/Users.jsx";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: "/",
        element: <Products />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/product",
        element: <Products />,
      },
      {
        path: "/add-items",
        element: <AddItems />,
      },
      {
        path : '/user',
        element : <Users/>
      }
    ],
  },
]);



createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  </StrictMode>
);
