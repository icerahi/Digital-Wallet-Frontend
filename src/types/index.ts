import type { ComponentType } from "react";

export type TRole = "SUPER_ADMIN" | "ADMIN" | "USER" | "AGENT";

export type ISidebarItemGroup = "top" | "middle" | "bottom";

export interface ISidebarItem {
  group?: ISidebarItemGroup;
  title?: string;
  url: string;
  icon?: ComponentType;
  Component: ComponentType;
}
