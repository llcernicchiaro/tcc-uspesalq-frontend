import { Group } from "@/types";
import useSWR from "swr";

export const useGetGroup = (groupId: string | undefined) => {
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
