import { mutate } from "swr";
import { useRouter } from "next/navigation";
import useSWRMutation from "swr/mutation";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

export const useLeaveGroup = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const fetcher = async (url: string, { arg: groupId }: { arg: string }) => {
    const response = await fetch(`${url}/groups/${groupId}/leave`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      toast.error("Erro ao sair do grupo");
      throw new Error("Erro ao sair do grupo");
    }

    toast.success("Você saiu do grupo com sucesso!");
    mutate(`${process.env.NEXT_PUBLIC_API_URL}/groups`);
    router.push("/groups");
  };

  const { trigger, isMutating, error } = useSWRMutation(
    `${process.env.NEXT_PUBLIC_API_URL}`,
    fetcher
  );

  return {
    leaveGroup: (groupId: string) => trigger(groupId),
    isLeaving: isMutating,
    isError: !!error,
  };
};
