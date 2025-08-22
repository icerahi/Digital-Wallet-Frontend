"use client";

import { MenuIcon } from "lucide-react";

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
import { Link } from "react-router";
import { ModeToggle } from "../theme/ModeToggle";

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
            <Button variant="outline">
              {" "}
              <Link to="/login">Login</Link>{" "}
            </Button>
            <Button className="rounded-4xl">
              <Link to="/Register">Register</Link>{" "}
            </Button>
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
                  <Button variant="outline">
                    <Link to="/login">Login</Link>
                  </Button>
                  <Button>
                    <Link to="/register">Register</Link>
                  </Button>
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
