import Agents from "@/pages/admin/Agents";
import AllTransactions from "@/pages/admin/AllTransactions";
import Analytics from "@/pages/admin/Analytics";
import Users from "@/pages/admin/Users";
import {
  LucideInspectionPanel,
  LucideLayoutDashboard,
  Users2,
  UsersIcon,
} from "lucide-react";

export const AdminSidebar = [
  {
    title: "Analytics",
    url: "/dashboard/analytics",
    icon: LucideLayoutDashboard,
    Component: Analytics,
  },
  {
    title: "Users",
    url: "/dashboard/users",
    icon: Users2,
    Component: Users,
  },
  {
    title: "Agents",
    url: "/dashboard/agents",
    icon: UsersIcon,
    Component: Agents,
  },
  {
    title: "Transactions",
    url: "/dashboard/transactions",
    icon: LucideInspectionPanel,
    Component: AllTransactions,
  },
];
