import { role } from "@/constants";
import type { TRole, TTransactionType } from "@/types";

export type TransactionInfo = {
  source?: "sender" | "receiver";
  balancePrefix?: "+" | "-";
};

export const getInfo = (
  type: TTransactionType,
  userRole: TRole
): TransactionInfo => {
  if (userRole === role.user) {
    switch (type) {
      case "ADD_MONEY":
      case "CASH_IN":
        return { source: "sender", balancePrefix: "+" };

      case "WITHDRAW_MONEY":
      case "SEND_MONEY":
      case "CASH_OUT":
        return { source: "receiver", balancePrefix: "-" };

      default:
        return {};
    }
  }

  if (userRole === role.agent) {
    switch (type) {
      case "CASH_IN":
        return { source: "receiver", balancePrefix: "-" };

      case "CASH_OUT":
        return { source: "sender", balancePrefix: "+" };

      default:
        return {};
    }
  }
  return {};
};
