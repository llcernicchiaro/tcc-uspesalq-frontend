"use client";

import React, { ButtonHTMLAttributes } from "react";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

const LogoutButton: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = (
  props
) => (
  <Button
    {...props}
    variant="outline"
    onClick={() => signOut({ callbackUrl: "/" })}
  >
    Sair da conta
  </Button>
);

export default LogoutButton;
