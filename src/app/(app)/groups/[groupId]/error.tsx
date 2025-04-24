"use client";

import FullscreenError from "@/components/FullPageError";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return <FullscreenError error={error} reset={reset} />;
}
