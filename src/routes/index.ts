import App from "@/App";
import { Homepage } from "@/pages/Homepage";
import Login from "@/pages/Login";

import Register from "@/pages/Register";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    Component: App,
    path: "/",
    children: [
      {
        index: true,
        Component: Homepage,
      },
    ],
  },
  { Component: Login, path: "/login" },
  { Component: Register, path: "/register" },
]);
