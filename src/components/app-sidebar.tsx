import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

import { Logo } from "@/assets/icons/Logo";
import { Collapsible } from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { role } from "@/constants";
import { cn } from "@/lib/utils";
import { useGetMeQuery } from "@/redux/features/user/user.api";
import { getRoleSpecificSidebar } from "@/utils/getRoleSpecificSidebar";
import { Link, useLocation } from "react-router";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: userData } = useGetMeQuery(undefined);

  const location = useLocation();

  const data = {
    navMain: [...getRoleSpecificSidebar(userData?.data?.role)],
  };

  const user = userData?.data;
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <div className="grid flex-1 text-left text-sm leading-tight">
            <Logo />
          </div>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu
            className={cn(
              user?.role === role.agent
                ? !user?.agentApproval && "pointer-events-none opacity-70"
                : ""
            )}
          >
            {data.navMain.map((item) => (
              <Collapsible
                key={item.title}
                asChild
                // defaultOpen={item.isActive}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <Link to={item.url}>
                    <SidebarMenuButton
                      isActive={item.url === location.pathname}
                      tooltip={item.title}
                    >
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}
