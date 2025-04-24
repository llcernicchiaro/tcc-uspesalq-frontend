"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function FullscreenError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-white px-4 text-center">
      <div className="mb-6 flex flex-col items-center">
        <AlertTriangle className="h-12 w-12 text-red-500" />
        <h1 className="mt-4 text-2xl font-semibold text-gray-800">
          Algo deu errado
        </h1>
        <p className="mt-2 text-gray-600 max-w-md">
          {error.message ||
            "Não conseguimos carregar essa página. Tente novamente ou entre em contato com o suporte."}
        </p>
      </div>
      <Button variant="outline" onClick={() => reset()}>
        Tentar novamente
      </Button>
    </div>
  );
}
