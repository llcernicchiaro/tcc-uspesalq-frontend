"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useParams, usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useGroup } from "@/hooks/useGroup";
import { GroupCardContent } from "@/components/GroupCard";

export default function GroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const pathname = usePathname();

  const groupId = params.groupId;
  const { group, isError, isLoading } = useGroup(groupId as string);

  const activeTab =
    ["events", "participants", "performance"].find((tab) =>
      pathname.includes(tab)
    ) || "events";

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/groups">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
      </div>

      {isLoading && <p>Carregando...</p>}
      {isError && <p>Erro ao carregar grupo</p>}
      {group && <GroupCardContent group={group} onlyContent />}
      <Tabs value={activeTab} className="w-full">
        <TabsList className="grid grid-cols-3">
          <TabsTrigger value="events">
            <Link href={`/groups/${groupId}/events`}>Eventos</Link>
          </TabsTrigger>
          <TabsTrigger value="participants">
            <Link href={`/groups/${groupId}/participants`}>Participantes</Link>
          </TabsTrigger>
          <TabsTrigger value="performance">
            <Link href={`/groups/${groupId}/performance`}>Desempenho</Link>
          </TabsTrigger>
        </TabsList>

        <div className="mt-4">{children}</div>
      </Tabs>
    </div>
  );
}
