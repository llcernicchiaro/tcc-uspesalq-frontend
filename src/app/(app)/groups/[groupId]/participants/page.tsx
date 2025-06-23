"use client";

import { MembersCardList } from "@/components/MembersCardList";
import { useGroupMembers } from "@/hooks/useGroupMembers";
import { useParams } from "next/navigation";

export default function ParticipantsPage() {
  const params = useParams();
  const groupId = params.groupId;

  const { data, isLoading, isError } = useGroupMembers(groupId as string);

  return (
    <div className="space-y-4">
      {isLoading && <p>Carregando...</p>}
      {isError && <p>Erro ao carregar os membros do grupo</p>}
      {data && (
        <>
          <h2 className="text-lg font-semibold">Membros</h2>
          <MembersCardList
            members={data?.active ?? []}
            groupId={groupId as string}
            variant="active"
          />

          {data?.isClosed && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Membros pendentes</h2>
              <MembersCardList
                members={data?.pending ?? []}
                groupId={groupId as string}
                variant="pending"
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
