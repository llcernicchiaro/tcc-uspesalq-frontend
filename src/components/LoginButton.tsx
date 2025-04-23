"use client";

import React from "react";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";

const LoginButton: React.FC = () => (
  <Button onClick={() => signIn("cognito")}>Entrar com Google</Button>
);

export default LoginButton;
