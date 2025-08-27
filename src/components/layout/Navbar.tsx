"use client";

import { LogOut, LogOutIcon, MenuIcon, User2, Wallet } from "lucide-react";

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
import { useGetMeQuery } from "@/redux/features/user/user.api";
import { useAppDispatch } from "@/redux/hook";
import { Link, NavLink, useNavigate } from "react-router";
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
    href: "/",
  },
  {
    title: "About",
    href: "/about",
  },
  {
    title: "Features",
    description: "Configure your preferences",
    href: "/features",
  },
  {
    title: "Contact",
    description: "Connect with other tools",
    href: "/contact",
  },
  {
    title: "FAQ",
    description: "Connect with other tools",
    href: "/faq",
  },
];

export const Navbar = () => {
  const { data } = useGetMeQuery(undefined);
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

  return (
    <section className="py-4  sticky top-0 z-50 bg-[var(--background)]/90 backdrop-blur-sm border-b border-[var(--border)] shadow-sm transition-all duration-300">
      <div className="container">
        <nav className="flex items-center justify-around ">
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
            {data?.owner ? (
              <div className="flex min-w-0 flex-col">
                <DropdownMenu>
                  <DropdownMenuTrigger className="focus:outline-none focus:ring-[2px] focus:ring-offset-2 focus:ring-primary rounded-full flex items-center">
                    <h4 className="font-bold border-b-2 border-secondary-foreground">
                      {data?.owner?.fullname}
                    </h4>
                    <User2 />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      <Link to="/my-wallet">
                        <Button variant="link">
                          <Wallet className="h-4 w-4" /> My Wallet
                        </Button>
                      </Link>{" "}
                    </DropdownMenuItem>

                    <DropdownMenuItem className="text-destructive">
                      <Button asChild variant="ghost" onClick={handleLogout}>
                        <span>
                          <LogOut className="h-4 w-4" /> Logout
                        </span>
                      </Button>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <>
                <Button asChild variant="outline">
                  <Link to="/login">Login</Link>
                </Button>
                <Button asChild>
                  <Link to="/Register">Register</Link>
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
                    <Link
                      to={item.href}
                      key={item.href}
                      className="font-medium"
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
                <div className="mt-6 flex flex-col gap-4">
                  {data?.owner ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <div className="flex items-center gap-2 focus:outline-none focus:ring-[2px] focus:ring-offset-2 focus:ring-primary rounded-full">
                          <h4 className="font-bold border-b-2 border-secondary-foreground">
                            {data?.owner?.fullname}
                          </h4>
                          <User2 />
                        </div>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent className="max-w-64">
                        <DropdownMenuLabel className="flex items-start gap-3">
                          <div className="flex min-w-0 flex-col">
                            <NavLink className="flex flex-col" to="/my-wallet">
                              <span className="text-foreground truncate text-sm font-medium">
                                My Wallet
                              </span>
                              <span className="text-muted-foreground truncate text-xs font-normal">
                                {data?.owner?.phone}
                              </span>
                            </NavLink>
                          </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />

                        <DropdownMenuItem>
                          <Button asChild onClick={handleLogout}>
                            <span>
                              <LogOutIcon
                                size={16}
                                className="opacity-60"
                                aria-hidden="true"
                              />
                              Logout
                            </span>
                          </Button>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <>
                      <Button asChild variant="outline">
                        <Link to="/login">Login</Link>
                      </Button>
                      <Button asChild className="rounded-4xl">
                        <Link to="/Register">Register</Link>
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
