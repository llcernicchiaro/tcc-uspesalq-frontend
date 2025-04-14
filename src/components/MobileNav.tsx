"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Users, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const navItems = [
  { href: "/dashboard", icon: Home, label: "Início" },
  { href: "/groups", icon: Users, label: "Grupos" },
  { href: "/profile", icon: User, label: "Perfil" },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 w-full border-t bg-background z-50 flex justify-around items-center py-2 sm:hidden">
      {navItems.map(({ href, icon: Icon, label }) => {
        const isActive = pathname.startsWith(href);

        return (
          <Link
            key={href}
            href={href}
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon" }),
              "flex flex-col items-center justify-center text-xs gap-0.5",
              isActive ? "text-primary" : "text-muted-foreground"
            )}
          >
            <Icon className="h-5 w-5" />
            <span className="text-xs">{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
