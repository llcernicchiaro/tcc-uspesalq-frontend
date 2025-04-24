import { auth } from "@/auth";
import { Group } from "@/types/group";

export const API_URL = process.env.NEXT_PUBLIC_API_URL;

// To use in the server side
const fetchWrapper = async (url: string, options?: RequestInit) => {
  const session = await auth();

  if (!session?.accessToken) {
    throw new Error("Token não encontrado.");
  }

  const res = await fetch(url, {
    ...options,
    headers: {
      ...options?.headers,
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.accessToken}`,
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });

  if (!res.ok) {
    throw new Error("Erro ao buscar dados.");
  }

  return res.json();
};

// Groups
export const createGroup = (group: Group): Promise<Group> =>
  fetchWrapper(`${API_URL}/group`, {
    method: "POST",
    body: JSON.stringify(group),
  });

export const fetchGroups = (): Promise<Group[]> =>
  fetchWrapper(`${API_URL}/groups`);

export const fetchGroupById = (id: string): Promise<Group> =>
  fetchWrapper(`${API_URL}/group/${id}`);

export const fetchMyGroups = (): Promise<Group[]> =>
  fetchWrapper(`${API_URL}/groups/mine`);

// Events
export const fetchNextEvents = (): Promise<Group[]> =>
  fetchWrapper(`${API_URL}/events/next`);
