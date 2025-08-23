import { role } from "@/constants/role";
import DepositMoney from "@/pages/user/DepositMoney";
import SendMoney from "@/pages/user/SendMoney";
import WithdrawMoney from "@/pages/user/WithdrawMoney";
import type { ISidebarItem, TRole } from "@/types";
import { checkAuth } from "@/utils/checkAuth";
import { MinusIcon, PlusSquareIcon, SendIcon } from "lucide-react";

export const UserSidebar: ISidebarItem[] = [
  {
    group: "middle",
    title: "Deposit",
    url: "/my-wallet/deposit",
    icon: PlusSquareIcon,
    Component: checkAuth(DepositMoney, role.user as TRole),
  },
  {
    group: "middle",
    title: "Withdraw",
    url: "/my-wallet/withdraw",
    icon: MinusIcon,
    Component: checkAuth(WithdrawMoney, role.user as TRole),
  },
  {
    group: "middle",
    title: "Send Money",
    url: "/my-wallet/sendmoney",
    icon: SendIcon,
    Component: checkAuth(SendMoney, role.user as TRole),
  },
];
