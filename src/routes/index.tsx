import App from "@/App";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { role } from "@/constants/index.ts";
import { Homepage } from "@/pages/Homepage";
import Login from "@/pages/Login";

import { SingleViewModal } from "@/components/modules/admin/singleview/SingleWallet.tsx";
import Register from "@/pages/Register";
import type { TRole } from "@/types";
import { checkAuth } from "@/utils/checkAuth";
import { generateRoutes } from "@/utils/generateRoutes";
import { createBrowserRouter, Navigate } from "react-router";
import { AdminSidebar } from "./sidebar/admin.sidebar.ts";
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
    Component: checkAuth(DashboardLayout, ...(Object.values(role) as [TRole])),
    path: "/dashboard",
    children: [
      { index: true, element: <Navigate to="/dashboard/overview" /> },

      ...generateRoutes(...AdminSidebar),
      { Component: SingleViewModal, path: "/dashboard/agents/:id" },
      { Component: SingleViewModal, path: "/dashboard/wallets/:id" },
      { Component: SingleViewModal, path: "/dashboard/transactions/:id" },
    ],
  },
]);
