"use client";

import { SWRConfig } from "swr";
import { useSession } from "next-auth/react";

export function SWRProvider({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const accessToken = session?.accessToken;

  return (
    <SWRConfig
      value={{
        fetcher: async (url: string) => {
          const res = await fetch(url, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          });

          if (!res.ok) {
            const error = await res.json();
            throw new Error(error.message || "Erro ao buscar dados");
          }

          return res.json();
        },
        refreshInterval: 0,
        revalidateOnFocus: false,
      }}
    >
      {children}
    </SWRConfig>
  );
}
