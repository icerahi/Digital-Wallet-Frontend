import { role } from "@/constants/role";
import CashIn from "@/pages/user/CashIn";
import CashOut from "@/pages/user/CashOut";
import type { ISidebarItem, TRole } from "@/types";
import { checkAuth } from "@/utils/checkAuth";
import { SendIcon, SendToBackIcon } from "lucide-react";

export const AgentSidebar: ISidebarItem[] = [
  {
    group: "middle",
    title: "Cash In",
    url: "/my-wallet/cashin",
    icon: SendIcon,
    Component: checkAuth(CashIn, role.agent as TRole),
  },
  {
    group: "middle",
    title: "Cash Out",
    url: "/my-wallet/cashout",
    icon: SendToBackIcon,
    Component: checkAuth(CashOut, role.agent as TRole),
  },
];
