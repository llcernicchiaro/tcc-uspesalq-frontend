import { Group } from "@/types/group";
import useSWR from "swr";

export const useGroup = (groupId: string | undefined) => {
  const shouldFetch = !!groupId;
  const { data, error, isLoading } = useSWR(
    shouldFetch ? `${process.env.NEXT_PUBLIC_API_URL}/group/${groupId}` : null
  );

  return {
    group: data as Group,
    isLoading,
    isError: !!error,
  };
};
