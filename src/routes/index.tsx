import App from "@/App";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { role } from "@/constants/index.ts";
import Analytics from "@/pages/admin/Analytics";
import { Homepage } from "@/pages/Homepage";
import Login from "@/pages/Login";

import Register from "@/pages/Register";
import type { TRole } from "@/types";
import { checkAuth } from "@/utils/checkAuth";
import { generateRoutes } from "@/utils/generateRoutes";
import { createBrowserRouter } from "react-router";
import { AgentSidebar } from "./sidebar/agent.sidebar.ts";
import { UserSidebar } from "./sidebar/user.sidebar";
import { UserAgentCommonSidebar } from "./sidebar/userAgentCommon.sidebar";

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

  // {
  //   Component: checkAuth(DashboardLayout, role.user as TRole),
  //   path: "/user/my-wallet",
  //   children: [...generateRoutes(UserSidebar)],
  // },
  {
    Component: checkAuth(DashboardLayout, ...(Object.values(role) as [TRole])),
    path: "/my-wallet",
    children: [
      ...generateRoutes(
        ...UserAgentCommonSidebar,
        ...UserSidebar,
        ...AgentSidebar
      ),
    ],
  },

  {
    Component: DashboardLayout,
    path: "/dashboard",
    children: [{ index: true, Component: Analytics }],
  },
]);
