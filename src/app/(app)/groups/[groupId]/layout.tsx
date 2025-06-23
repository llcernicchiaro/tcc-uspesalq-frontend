"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useParams, usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { useGetGroup } from "@/hooks/useGetGroup";
import { GroupCardContent } from "@/components/GroupCard";
import { Separator } from "@/components/ui/separator";
import { DeleteGroupButton } from "@/components/DeleteButton";
import BackButton from "@/components/BackButton";
import { LeaveGroupButton } from "@/components/LeaveGroupButton";

export default function GroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const pathname = usePathname();
  const groupId = params.groupId;
  const { group, isError, isLoading } = useGetGroup(groupId as string);

  const activeTab =
    ["events", "participants"].find((tab) => pathname.includes(tab)) ||
    "events";

  return (
    <div className="p-4 space-y-4">
      <BackButton />

      {isLoading && <p>Carregando...</p>}
      {isError && <p>Erro ao carregar grupo</p>}
      {pathname.includes("edit") ? (
        <div>{children}</div>
      ) : (
        group && (
          <>
            <GroupCardContent group={group} />
            {group.role && group.status !== "pending" && (
              <div>
                <Separator />
                <div className="flex items-center mt-3 space-x-2">
                  <p className="flex-3 text-sm text-muted-foreground ml-2">
                    Área {group.role === "admin" ? "do admin" : "do membro"}:
                  </p>
                  <div className="space-x-3">
                    <LeaveGroupButton groupId={groupId as string} />
                    {group.role === "admin" && (
                      <>
                        <Link href={`/groups/${groupId}/edit`}>
                          <Button variant="outline" size="sm">
                            <Edit />
                          </Button>
                        </Link>
                        <DeleteGroupButton groupId={groupId as string} />
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}

            <Tabs value={activeTab} className="w-full">
              <TabsList className="grid grid-cols-3">
                <TabsTrigger value="events">
                  <Link href={`/groups/${groupId}/events`}>Eventos</Link>
                </TabsTrigger>
                <TabsTrigger value="participants">
                  <Link href={`/groups/${groupId}/participants`}>
                    Participantes
                  </Link>
                </TabsTrigger>
              </TabsList>

              <div className="mt-4">{children}</div>
            </Tabs>
          </>
        )
      )}
    </div>
  );
}
