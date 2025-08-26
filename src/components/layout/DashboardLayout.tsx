import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { authApi, useLogoutMutation } from "@/redux/features/auth/auth.api";
import { useGetMeQuery } from "@/redux/features/user/user.api";
import { useAppDispatch } from "@/redux/hook";
import { Outlet } from "react-router";
import { toast } from "sonner";
import { ModeToggle } from "../theme/ModeToggle";
import { Button } from "../ui/button";

export default function DashboardLayout() {
  const { data } = useGetMeQuery(undefined);

  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    const res = await logout(undefined).unwrap();
    if (res.success) {
      toast.success("Logout successfully");
      dispatch(authApi.util.resetApiState());
    }
  };

  return (
    <SidebarProvider className="">
      <AppSidebar className="" />
      <SidebarInset className="">
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex justify-between w-full items-center gap-2 px-4">
            <div className="flex items-center">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />
            </div>
            <div className="flex items-center gap-4">
              {" "}
              <Button
                onClick={handleLogout}
                variant="secondary"
                className="font-bold border-b-2 border-secondary-foreground"
              >
                {data?.data?.fullname} (logout)
              </Button>
              <ModeToggle />
            </div>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
