import { mutate } from "swr";
import { useRouter } from "next/navigation";
import useSWRMutation from "swr/mutation";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

export const useJoinGroup = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const fetcher = async (url: string, { arg: groupId }: { arg: string }) => {
    const response = await fetch(`${url}/groups/${groupId}/join`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      toast.error("Erro ao entrar no grupo");
      throw new Error("Erro ao entrar no grupo");
    }

    toast.success("Você entrou no grupo com sucesso!");
    mutate(`${process.env.NEXT_PUBLIC_API_URL}/groups`);
    router.push(`/groups/${groupId}`);
  };

  const { trigger, isMutating, error } = useSWRMutation(
    `${process.env.NEXT_PUBLIC_API_URL}`,
    fetcher
  );

  return {
    joinGroup: (groupId: string) => trigger(groupId),
    isJoining: isMutating,
    isError: !!error,
  };
};
