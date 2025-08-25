import { role } from "@/constants";
import { AdminSidebar } from "@/routes/sidebar/admin.sidebar";
import { AgentSidebar } from "@/routes/sidebar/agent.sidebar.ts";
import { UserSidebar } from "@/routes/sidebar/user.sidebar";
import { UserAgentCommonSidebar } from "@/routes/sidebar/userAgentCommon.sidebar";
import type { ISidebarItem, ISidebarItemGroup, TRole } from "@/types";

const orderByGroup = (...sideber: ISidebarItem[]) => {
  const groupOrder: Record<ISidebarItemGroup, number> = {
    top: 1,
    middle: 2,
    bottom: 3,
  };

  return sideber.sort(
    (a, b) =>
      groupOrder[a.group as ISidebarItemGroup] -
      groupOrder[b.group as ISidebarItemGroup]
  );
};

export const getRoleSpecificSidebar = (userRole: TRole) => {
  switch (userRole) {
    case role.user:
      return orderByGroup(...UserAgentCommonSidebar, ...UserSidebar);

    case role.agent:
      return orderByGroup(...UserAgentCommonSidebar, ...AgentSidebar);

    case role.admin:
      return [...AdminSidebar];
    case role.superAdmin:
      return [...AdminSidebar];

    default:
      return [];
  }
};
