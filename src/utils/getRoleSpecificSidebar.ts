import { role } from "@/constants/role";
import { AdminSidebar } from "@/routes/AdminSidebar";
import { AgentSidebar } from "@/routes/AgentSidebar";
import { UserSidebar } from "@/routes/UserSidebar";
import type { TRole } from "@/types";

export const getRoleSpecificSidebar = (userRole: TRole) => {
  switch (userRole) {
    case role.user:
      return [...UserSidebar];
    case role.agent:
      return [...AgentSidebar];
    case role.admin:
      return [...AdminSidebar];
    case role.superAdmin:
      return [...AdminSidebar];

    default:
      return [];
  }
};
