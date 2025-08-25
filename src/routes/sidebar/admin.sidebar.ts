import { role } from "@/constants";
import Agents from "@/pages/admin/Agents";
import AllTransactions from "@/pages/admin/AllTransactions";
import Analytics from "@/pages/admin/Analytics";
import Users from "@/pages/admin/Users";
import type { ISidebarItem, TRole } from "@/types";
import { checkAuth } from "@/utils/checkAuth";
import {
  LucideInspectionPanel,
  LucideLayoutDashboard,
  Users2,
  UsersIcon,
} from "lucide-react";

export const AdminSidebar: ISidebarItem[] = [
  {
    title: "Analytics",
    url: "/dashboard/analytics",
    icon: LucideLayoutDashboard,
    Component: checkAuth(Analytics, role.admin as TRole),
  },
  {
    title: "Users",
    url: "/dashboard/users",
    icon: Users2,
    Component: checkAuth(Users, role.admin as TRole),
  },
  {
    title: "Agents",
    url: "/dashboard/agents",
    icon: UsersIcon,
    Component: checkAuth(Agents, role.admin as TRole),
  },
  {
    title: "Transactions",
    url: "/dashboard/transactions",
    icon: LucideInspectionPanel,
    Component: checkAuth(AllTransactions, role.admin as TRole),
  },
];
