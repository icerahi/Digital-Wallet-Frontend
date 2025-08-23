import App from "@/App";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Analytics from "@/pages/admin/Analytics";
import { Homepage } from "@/pages/Homepage";
import Login from "@/pages/Login";

import Register from "@/pages/Register";
import { generateRoutes } from "@/utils/generateRoutes";
import { createBrowserRouter } from "react-router";
import { AgentSidebar } from "./AgentSidebar";
import { UserSidebar } from "./UserSidebar";

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

  {
    Component: DashboardLayout,
    path: "/user/my-wallet",
    children: [...generateRoutes(UserSidebar)],
  },
  {
    Component: DashboardLayout,
    path: "/agent/my-wallet",
    children: [...generateRoutes(AgentSidebar)],
  },

  {
    Component: DashboardLayout,
    path: "/dashboard",
    children: [{ index: true, Component: Analytics }],
  },
]);
