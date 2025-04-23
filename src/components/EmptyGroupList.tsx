import { Users } from "lucide-react";
import Link from "next/link";

export default function EmptyGroupList() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 text-muted-foreground">
      <Users className="w-12 h-12 mb-4" />
      <h2 className="text-xl font-semibold mb-2 text-foreground">
        Nenhum grupo encontrado
      </h2>
      <p className="max-w-sm mb-4">
        Você ainda não participa de nenhum grupo.{" "}
        <Link
          href="/groups/new"
          className="text-primary hover:underline font-medium"
        >
          Crie
        </Link>{" "}
        ou{" "}
        <Link
          href="/groups"
          className="text-primary hover:underline font-medium"
        >
          encontre um grupo.
        </Link>
      </p>
    </div>
  );
}
