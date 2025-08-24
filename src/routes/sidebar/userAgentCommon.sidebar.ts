import MyWallet from "@/pages/user/MyWallet";
import Settings from "@/pages/user/Settings";
import TransactionHistory from "@/pages/user/TransactionHistory";
import { ReceiptText, Settings2, Wallet2Icon } from "lucide-react";

import { role } from "@/constants/role";
import type { ISidebarItem, TRole } from "@/types";
import { checkAuth } from "@/utils/checkAuth";

export const UserAgentCommonSidebar: ISidebarItem[] = [
  {
    group: "top",
    title: "My Wallet",
    url: "/my-wallet",
    icon: Wallet2Icon,
    // isActive: true,
    Component: checkAuth(MyWallet, role.user as TRole, role.agent as TRole),
  },
  {
    group: "bottom",
    title: "Transaction History",
    url: "/my-wallet/transactions",
    icon: ReceiptText,
    Component: checkAuth(
      TransactionHistory,
      role.user as TRole,
      role.agent as TRole
    ),
  },
  {
    group: "bottom",
    title: "Settings",
    url: "/my-wallet/settings",
    icon: Settings2,
    Component: checkAuth(Settings, role.user as TRole, role.agent as TRole),
  },
];
