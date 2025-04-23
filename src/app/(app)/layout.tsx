import { auth } from "@/auth";
import MobileNav from "@/components/MobileNav";
import { signOut } from "next-auth/react";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.accessToken) {
    signOut({ callbackUrl: "/" });
  }

  return (
    <div className="pb-16">
      {children}
      <MobileNav />
    </div>
  );
}
