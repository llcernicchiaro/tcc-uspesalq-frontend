import useSWR from "swr";
import { useSession } from "next-auth/react";
import { GroupMembersResponse } from "@/types/GroupMembersResponse";

const fetchGroupMembers = async (
  url: string,
  token: string
): Promise<GroupMembersResponse> => {
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Erro ao buscar membros do grupo");
  }

  return response.json();
};

export const useGroupMembers = (groupId?: string) => {
  const { data: session } = useSession();

  const shouldFetch = !!groupId && !!session?.accessToken;

  const { data, error, isLoading, mutate } = useSWR(
    shouldFetch
      ? `${process.env.NEXT_PUBLIC_API_URL}/groups/${groupId}/memberships`
      : null,
    (url) => fetchGroupMembers(url, session!.accessToken!)
  );

  return {
    data,
    isLoading,
    isError: !!error,
    mutate,
  };
};
