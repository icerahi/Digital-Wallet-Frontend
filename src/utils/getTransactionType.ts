import { transactionTypes } from "@/constants";
import type { TTransactionType } from "@/types";

export const getTransactionType = (type?: TTransactionType) => {
  return transactionTypes.find((item) => item.value === type);
};
