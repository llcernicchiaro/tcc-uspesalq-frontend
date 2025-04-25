import { mutate } from "swr";
import { useSession } from "next-auth/react";
import useSWRMutation from "swr/mutation";
import { toast } from "sonner";

type UpdateArgs = {
  groupId: string;
  userId: string;
  status?: "active" | "inactive";
  role?: "admin" | "participant";
  action?: "remove";
};

export const useUpdateMembership = () => {
  const { data: session } = useSession();

  const fetcher = async (url: string, { arg }: { arg: UpdateArgs }) => {
    const { groupId, userId, ...body } = arg;

    const response = await fetch(
      `${url}/${groupId}/memberships/${userId}/status`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    if (!response.ok) {
      toast.error("Erro ao atualizar participação.");
      throw new Error("Falha na atualização");
    }

    toast.success("Participação atualizada com sucesso!");
    mutate(`${process.env.NEXT_PUBLIC_API_URL}/groups/${groupId}/members`);
  };

  const { trigger, isMutating, error } = useSWRMutation(
    `${process.env.NEXT_PUBLIC_API_URL}/group`,
    fetcher
  );

  return {
    updateMembership: trigger,
    isUpdating: isMutating,
    isError: !!error,
  };
};
