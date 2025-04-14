"use client";

import { signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export default function ProfilePage() {
  const { data: session } = useSession();

  if (!session?.user) return <p className="p-4">Carregando perfil...</p>;

  const { name, email, image, role } = {
    ...session.user,
    role: session.user.role ?? "unknown",
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center space-x-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={image ?? ""} alt={name ?? ""} />
          <AvatarFallback>{name?.[0]}</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-lg font-medium">{name}</p>
          <p className="text-sm text-muted-foreground">{email}</p>
        </div>
      </div>

      <div className="space-y-1">
        <p className="text-sm">
          <span className="font-medium">Permissão:</span> {role}
        </p>
      </div>

      <Button variant="outline" onClick={() => signOut({ callbackUrl: "/" })}>
        Sair da conta
      </Button>
    </div>
  );
}
