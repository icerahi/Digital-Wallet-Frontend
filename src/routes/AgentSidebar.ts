import CashIn from "@/pages/user/CashIn";
import CashOut from "@/pages/user/CashOut";
import MyWallet from "@/pages/user/MyWallet";
import Settings from "@/pages/user/Settings";
import TransactionHistory from "@/pages/user/TransactionHistory";
import {
  LucideMoveDownLeft,
  SendIcon,
  SendToBackIcon,
  Settings2,
  Wallet2Icon,
} from "lucide-react";

export const AgentSidebar = [
  {
    title: "My Wallet",
    url: "/agent/my-wallet",
    icon: Wallet2Icon,
    // isActive: true,
    Component: MyWallet,
  },
  {
    title: "Cash In",
    url: "/agent/my-wallet/cashin",
    icon: SendIcon,
    Component: CashIn,
  },
  {
    title: "Cash Out",
    url: "/agent/my-wallet/cashout",
    icon: SendToBackIcon,
    Component: CashOut,
  },
  {
    title: "Transaction History",
    url: "/agent/my-wallet/transactions",
    icon: LucideMoveDownLeft,
    Component: TransactionHistory,
  },
  {
    title: "Settings",
    url: "/agent/my-wallet/settings",
    icon: Settings2,
    Component: Settings,
  },
];
