"use client";

import { CircleUserRoundIcon, LogOutIcon, MenuIcon } from "lucide-react";

import { Logo } from "@/assets/icons/Logo";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { authApi, useLogoutMutation } from "@/redux/features/auth/auth.api";
import { useMyWalletQuery } from "@/redux/features/wallet/wallet.api";
import { useAppDispatch } from "@/redux/hook";
import { Link, NavLink } from "react-router";
import { toast } from "sonner";
import { ModeToggle } from "../theme/ModeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const NavbarMenuList = [
  {
    title: "Home",
    href: "#",
  },
  {
    title: "About",
    href: "#",
  },
  {
    title: "Features",
    description: "Configure your preferences",
    href: "#",
  },
  {
    title: "Contact",
    description: "Connect with other tools",
    href: "#",
  },
];

export const Navbar = () => {
  const { data, isLoading, error } = useMyWalletQuery(undefined);
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
    <section className="py-4">
      <div className="container">
        <nav className="flex items-center justify-around sticky-top">
          <Link to="/">
            <Logo />
          </Link>
          <NavigationMenu className="hidden lg:block">
            <NavigationMenuList>
              {NavbarMenuList.map((item) => (
                <NavigationMenuItem>
                  <NavigationMenuLink
                    href={item.href}
                    className={navigationMenuTriggerStyle()}
                  >
                    {item.title}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          <div className="hidden items-center gap-4 lg:flex">
            {data?.data?.owner ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    size="lg"
                    variant="link"
                    className="rounded-full"
                    aria-label="Open account menu"
                  >
                    {data?.data?.owner?.fullname}
                    <CircleUserRoundIcon size={16} aria-hidden="true" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="max-w-64">
                  <DropdownMenuLabel className="flex items-start gap-3">
                    <div className="flex min-w-0 flex-col">
                      <NavLink className="flex flex-col" to="/my-wallet">
                        {" "}
                        <span className="text-foreground truncate text-sm font-medium">
                          My Wallet
                        </span>
                        <span className="text-muted-foreground truncate text-xs font-normal">
                          {data?.data?.owner?.phone}
                        </span>
                      </NavLink>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />

                  <DropdownMenuItem>
                    <Button variant="ghost" onClick={handleLogout}>
                      {" "}
                      <LogOutIcon
                        size={16}
                        className="opacity-60"
                        aria-hidden="true"
                      />
                      <span>Logout</span>
                    </Button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                {" "}
                <Button variant="outline">
                  {" "}
                  <Link to="/login">Login</Link>{" "}
                </Button>
                <Button className="rounded-4xl">
                  <Link to="/Register">Register</Link>{" "}
                </Button>
              </>
            )}
            <ModeToggle />
          </div>

          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="outline" size="icon">
                <MenuIcon className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="top" className="max-h-screen overflow-auto">
              <SheetHeader>
                <SheetTitle>
                  <Link to="/">
                    <Logo />
                  </Link>
                </SheetTitle>
              </SheetHeader>

              <div className="flex flex-col p-4">
                <div className="flex flex-col gap-6">
                  {NavbarMenuList.map((item) => (
                    <Link to={item.href} className="font-medium">
                      {item.title}
                    </Link>
                  ))}
                </div>
                <div className="mt-6 flex flex-col gap-4">
                  {data?.data?.owner ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          size="lg"
                          variant="link"
                          className="rounded-full"
                          aria-label="Open account menu"
                        >
                          {data?.data?.owner?.fullname}
                          <CircleUserRoundIcon size={16} aria-hidden="true" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="max-w-64">
                        <DropdownMenuLabel className="flex items-start gap-3">
                          <div className="flex min-w-0 flex-col">
                            <NavLink className="flex flex-col" to="/my-wallet">
                              {" "}
                              <span className="text-foreground truncate text-sm font-medium">
                                My Wallet
                              </span>
                              <span className="text-muted-foreground truncate text-xs font-normal">
                                {data?.data?.owner?.phone}
                              </span>
                            </NavLink>
                          </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />

                        <DropdownMenuItem>
                          <Button onClick={handleLogout}>
                            {" "}
                            <LogOutIcon
                              size={16}
                              className="opacity-60"
                              aria-hidden="true"
                            />
                            <span>Logout</span>
                          </Button>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <>
                      {" "}
                      <Button variant="outline">
                        {" "}
                        <Link to="/login">Login</Link>{" "}
                      </Button>
                      <Button className="rounded-4xl">
                        <Link to="/Register">Register</Link>{" "}
                      </Button>
                    </>
                  )}
                  <ModeToggle />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </section>
  );
};
