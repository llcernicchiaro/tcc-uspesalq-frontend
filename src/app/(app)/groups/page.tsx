import Link from "next/link";

import { ErrorToast } from "@/components/ErrorToast";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Group } from "@/types";
import { fetchGroups } from "@/lib/api";
import GroupCard from "@/components/GroupCard";
import { Plus } from "lucide-react";

export default async function GroupsPage() {
  let groups: Group[] = [];
  let errorMessage = "";

  try {
    groups = await fetchGroups();
  } catch (err: unknown) {
    if (err instanceof Error) {
      errorMessage = err.message;
    } else {
      errorMessage = "An unknown error occurred.";
    }
  }

  return (
    <div className="p-4 space-y-4">
      {errorMessage && <ErrorToast error={errorMessage} />}
      <h1 className="text-xl font-semibold">Grupos</h1>

      <div className="flex flex-row gap-2 mb-4 items-center justify-between">
        <span className="text-xs text-muted-foreground">
          Você pode criar um grupo
          <br /> ou se juntar a um grupo existente.
        </span>
        <Link href="/groups/new">
          <Button>
            <Plus />
            Criar grupo
          </Button>
        </Link>
      </div>
      <Separator />
      {groups.map((group) => (
        <GroupCard key={group.id} group={group} />
      ))}
    </div>
  );
}
