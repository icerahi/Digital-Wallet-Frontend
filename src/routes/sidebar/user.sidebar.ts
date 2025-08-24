import { role } from "@/constants/role";
import DepositMoney from "@/pages/user/DepositMoney";
import SendMoney from "@/pages/user/SendMoney";
import WithdrawMoney from "@/pages/user/WithdrawMoney";
import type { ISidebarItem, TRole } from "@/types";
import { checkAuth } from "@/utils/checkAuth";
import { BanknoteArrowUp, Forward, SquarePlus } from "lucide-react";

export const UserSidebar: ISidebarItem[] = [
  {
    group: "middle",
    title: "Deposit",
    url: "/my-wallet/deposit",
    icon: SquarePlus,
    Component: checkAuth(DepositMoney, role.user as TRole),
  },
  {
    group: "middle",
    title: "Withdraw",
    url: "/my-wallet/withdraw",
    icon: BanknoteArrowUp,
    Component: checkAuth(WithdrawMoney, role.user as TRole),
  },
  {
    group: "middle",
    title: "Send Money",
    url: "/my-wallet/sendmoney",
    icon: Forward,
    Component: checkAuth(SendMoney, role.user as TRole),
  },
];
