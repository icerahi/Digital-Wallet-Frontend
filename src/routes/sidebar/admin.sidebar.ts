import { role } from "@/constants";
import Agents from "@/pages/admin/Agents";
import Overview from "@/pages/admin/Overview";
import AllTransactions from "@/pages/admin/Transactions";
import Wallets from "@/pages/admin/Wallets";
import Settings from "@/pages/Settings";
import type { ISidebarItem, TRole } from "@/types";
import { checkAuth } from "@/utils/checkAuth";
import {
  LucideInspectionPanel,
  LucideLayoutDashboard,
  Settings2,
  UsersIcon,
  Wallet,
} from "lucide-react";

export const AdminSidebar: ISidebarItem[] = [
  {
    title: "Overview",
    url: "/dashboard/overview",
    icon: LucideLayoutDashboard,
    Component: checkAuth(Overview, role.admin as TRole),
  },
  {
    title: "Wallets Management",
    url: "/dashboard/wallets",
    icon: Wallet,
    Component: checkAuth(Wallets, role.admin as TRole),
  },
  {
    title: "Agents Management",
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
  {
    group: "bottom",
    title: "Settings",
    url: "/dashboard/settings",
    icon: Settings2,
    Component: checkAuth(
      Settings,
      role.admin as TRole,
      role.superAdmin as TRole
    ),
  },
];
