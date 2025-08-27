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
import { useEffect, useState } from "react";
import Joyride, { type Step } from "react-joyride";
import { Outlet, useNavigate } from "react-router";
import { toast } from "sonner";
import { DashboardLoader } from "../loaders/DashboardLoader";
import { ModeToggle } from "../theme/ModeToggle";
import { Button } from "../ui/button";

const steps: Step[] = [
  {
    target: ".addMoney",
    content: "You can add money by clicking here",
  },
  {
    target: ".withdrawMoney",
    content: "You can withdraw money by clicking here",
  },
  {
    target: ".sendMoney",
    content: "You can send money by clicking here",
  },
  {
    target: ".cashin",
    content: "You can cashin money by clicking here",
  },
  {
    target: ".cashout",
    content: "You can cashout by clicking here",
  },

  {
    target: ".balance",
    content: "Your Balance",
  },

  {
    target: ".recentTransactions",
    content: "Your recents transaction will display here",
  },

  {
    target: ".changeTheme",
    content: "Your Can change theme by clicking here",
  },
];

export default function DashboardLayout() {
  const { data, isLoading } = useGetMeQuery(undefined);
  const [runTour, setRunTour] = useState(false);
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const handleLogout = async () => {
    const res = await logout(undefined).unwrap();
    if (res.success) {
      toast.success("Logout successfully");
      navigate("/");
      dispatch(authApi.util.resetApiState());
    }
  };

  // Auto-run for new users
  useEffect(() => {
    const isNewUserTourDone = localStorage.getItem("tourDone");
    if (!isNewUserTourDone) {
      setRunTour(true);
    }
  }, []);

  // Tour callback
  const handleTourCallback = (data: any) => {
    if (data.status === "finished") {
      localStorage.setItem("tourDone", "true");
      setRunTour(false);
    }
  };

  if (isLoading) {
    return <DashboardLoader />;
  }
  return (
    <SidebarProvider className="">
      <Joyride
        steps={steps}
        run={runTour}
        continuous
        showSkipButton
        showProgress
        callback={handleTourCallback}
        styles={{ options: { zIndex: 1000 } }}
      />
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
                className="cursor-pointer font-bold"
                variant="link"
              >
                {data?.data?.fullname} (logout)
              </Button>
              <Button
                onClick={() => setRunTour(true)}
                className="cursor-pointer font-bold"
                variant="link"
              >
                Guided Tour
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
