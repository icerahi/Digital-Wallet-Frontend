import type { ComponentType } from "react";

export type TRole = "SUPER_ADMIN" | "ADMIN" | "USER" | "AGENT";

export type ISidebarItemGroup = "top" | "middle" | "bottom";

export type TTransactionType =
  | "ADD_MONEY"
  | "WITHDRAW_MONEY"
  | "SEND_MONEY"
  | "CASH_IN"
  | "CASH_OUT";

export interface ISidebarItem {
  group?: ISidebarItemGroup;
  title?: string;
  url: string;
  icon?: ComponentType;
  Component: ComponentType;
}

export interface ITransaction {
  _id: string;
  type: TTransactionType;
  amount: number;
  sender: {};
  receiver: {};
  status: string;
  createdAt: string;
  [key: string]: unknown;
}
