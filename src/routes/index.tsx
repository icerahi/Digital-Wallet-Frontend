import App from "@/App";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { role } from "@/constants/index.ts";
import { Homepage } from "@/pages/Homepage";
import Login from "@/pages/Login";

import SingleTransaction from "@/components/modules/admin/singleview/SingleTransaction.tsx";
import SingleUser from "@/components/modules/admin/singleview/SingleUser.tsx";
import SingleWallet from "@/components/modules/admin/singleview/SingleWallet.tsx";
import AboutPage from "@/pages/About.tsx";
import ContactPage from "@/pages/Contact.tsx";
import FAQ from "@/pages/FAQ.tsx";
import FeaturesPage from "@/pages/Features.tsx";
import NotFoundPage from "@/pages/NotFound.tsx";
import Register from "@/pages/Register";
import UnauthorizedPage from "@/pages/Unauthorized.tsx";
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
      {
        Component: AboutPage,
        path: "/about",
      },
      {
        Component: FeaturesPage,
        path: "/features",
      },
      {
        Component: ContactPage,
        path: "/contact",
      },
      {
        Component: FAQ,
        path: "/faq",
      },
    ],
  },
  { Component: Login, path: "/login" },
  { Component: Register, path: "/register" },
  { Component: UnauthorizedPage, path: "/unauthorized" },
  { Component: NotFoundPage, path: "*" },

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
      {
        Component: checkAuth(
          SingleUser,
          role.admin as TRole,
          role.superAdmin as TRole
        ),
        path: "/dashboard/agents/:id",
      },
      {
        Component: checkAuth(
          SingleWallet,
          role.admin as TRole,
          role.superAdmin as TRole
        ),
        path: "/dashboard/wallets/:id",
      },
      {
        Component: checkAuth(
          SingleTransaction,
          role.admin as TRole,
          role.superAdmin as TRole
        ),
        path: "/dashboard/transactions/:id",
      },
    ],
  },
]);
