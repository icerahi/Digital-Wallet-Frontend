import DepositMoney from "@/pages/user/DepositMoney";
import MyWallet from "@/pages/user/MyWallet";
import SendMoney from "@/pages/user/SendMoney";
import Settings from "@/pages/user/Settings";
import TransactionHistory from "@/pages/user/TransactionHistory";
import WithdrawMoney from "@/pages/user/WithdrawMoney";
import {
  LucideMoveDownLeft,
  MinusIcon,
  PlusSquareIcon,
  SendIcon,
  Settings2,
  Wallet2Icon,
} from "lucide-react";

export const UserSidebar = [
  {
    title: "My Wallet",
    url: "/user/my-wallet",
    icon: Wallet2Icon,
    // isActive: true,
    Component: MyWallet,
  },
  {
    title: "Deposit",
    url: "/user/my-wallet/deposit",
    icon: PlusSquareIcon,
    Component: DepositMoney,
  },
  {
    title: "Withdraw",
    url: "/user/my-wallet/withdraw",
    icon: MinusIcon,
    Component: WithdrawMoney,
  },
  {
    title: "Send Money",
    url: "/user/my-wallet/sendmoney",
    icon: SendIcon,
    Component: SendMoney,
  },
  {
    title: "Transaction History",
    url: "/user/my-wallet/transactions",
    icon: LucideMoveDownLeft,
    Component: TransactionHistory,
  },
  {
    title: "Settings",
    url: "/user/my-wallet/settings",
    icon: Settings2,
    Component: Settings,
  },
];
