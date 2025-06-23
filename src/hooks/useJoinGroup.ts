import { mutate } from "swr";
import { useRouter } from "next/navigation";
import useSWRMutation from "swr/mutation";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { Group } from "@/types";

export const useJoinGroup = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const fetcher = async (url: string, { arg: group }: { arg: Group }) => {
    const response = await fetch(`${url}/groups/${group.id}/memberships`, {
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

    toast.success(
      group.type === "open"
        ? "Você entrou no grupo com sucesso!"
        : "Seu pedido para entrar no grupo foi enviado com sucesso!"
    );
    mutate(`${process.env.NEXT_PUBLIC_API_URL}/groups`);
    router.push(`/groups/${group.id}/events`);
  };

  const { trigger, isMutating, error } = useSWRMutation(
    process.env.NEXT_PUBLIC_API_URL,
    fetcher
  );

  return {
    joinGroup: (group: Group) => trigger(group),
    isJoining: isMutating,
    isError: !!error,
  };
};
