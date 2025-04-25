import { mutate } from "swr";
import { useRouter } from "next/navigation";
import useSWRMutation from "swr/mutation";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

export const useDeleteGroup = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const fetcher = async (url: string, { arg: groupId }: { arg: string }) => {
    const response = await fetch(`${url}/${groupId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      toast.error("Erro ao deletar grupo");
      throw new Error("Erro ao excluir grupo");
    }

    toast.success("Grupo excluído com sucesso!");
    mutate(`${process.env.NEXT_PUBLIC_API_URL}/groups`);
    router.push("/groups");
  };

  const { trigger, isMutating, error } = useSWRMutation(
    `${process.env.NEXT_PUBLIC_API_URL}/groups`,
    fetcher
  );

  return {
    deleteGroup: (groupId: string) => trigger(groupId),
    isDeleting: isMutating,
    isError: !!error,
  };
};
