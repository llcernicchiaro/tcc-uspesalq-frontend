"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Users, User } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", icon: Home, label: "Dashboard" },
  { href: "/groups", icon: Users, label: "Grupos" },
  { href: "/profile", icon: User, label: "Perfil" },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 w-full bg-white border-t flex justify-around p-2 z-50">
      {navItems.map(({ href, icon: Icon, label }) => (
        <Link
          key={href}
          href={href}
          className="flex flex-col items-center text-xs"
        >
          <Icon
            className={cn(
              "h-5 w-5",
              pathname.startsWith(href) ? "text-blue-600" : "text-gray-400"
            )}
          />
          <span
            className={
              pathname.startsWith(href) ? "text-blue-600" : "text-gray-400"
            }
          >
            {label}
          </span>
        </Link>
      ))}
    </nav>
  );
}
