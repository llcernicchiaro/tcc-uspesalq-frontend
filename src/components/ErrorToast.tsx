"use client";

import { useEffect } from "react";
import { toast } from "sonner";

interface ErrorDisplayProps {
  error: string;
}

export function ErrorToast({ error }: ErrorDisplayProps) {
  useEffect(() => {
    toast.error(error);
  }, [error]);

  return null;
}
