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
import { useMyWalletQuery } from "@/redux/features/wallet/wallet.api";
import { getRoleSpecificSidebar } from "@/utils/getRoleSpecificSidebar";
import { Link } from "react-router";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: userData, isLoading, error } = useMyWalletQuery(undefined);
  console.log(userData);
  const data = {
    navMain: [...getRoleSpecificSidebar(userData?.data?.owner?.role)],
  };
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
          <SidebarMenu>
            {data.navMain.map((item) => (
              <Collapsible
                key={item.title}
                asChild
                // defaultOpen={item.isActive}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <Link to={item.url}>
                    <SidebarMenuButton tooltip={item.title}>
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
