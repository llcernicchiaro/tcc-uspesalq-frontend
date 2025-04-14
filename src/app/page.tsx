"use client";

import { signIn, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.user) {
      router.replace("/dashboard");
    }
  }, [session, router]);

  return (
    <main className="h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-3xl font-bold mb-2">RunTrack</h1>
      <p className="text-muted-foreground mb-6">
        Organize seus treinos em grupo com facilidade
      </p>
      <Button onClick={() => signIn("google")}>Entrar com Google</Button>
    </main>
  );
}
