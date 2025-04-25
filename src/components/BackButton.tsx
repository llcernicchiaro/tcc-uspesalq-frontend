import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function BackButton() {
  const router = useRouter();
  return (
    <Button variant="ghost" size="icon" asChild onClick={() => router.back()}>
      <ArrowLeft className="h-5 w-5" />
    </Button>
  );
}
