"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useGroup } from "@/hooks/useGroup";
import { UserX } from "lucide-react";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";

export default function ParticipantsPage() {
  const { data } = useSession();
  const params = useParams();
  const groupId = params.groupId;

  const { group } = useGroup(groupId as string);

  return (
    <div className="p-4 space-y-4">
      {(group?.members ?? []).map((user) => (
        <div key={user.id} className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={user.picture} />
              <AvatarFallback>{user.name[0]}</AvatarFallback>
            </Avatar>
            <div className="text-sm">
              <p className="font-medium">{user.name}</p>
              <p className="text-muted-foreground text-xs">{user.email}</p>
              {user.role === "admin" && (
                <span className="text-xs text-blue-500">Admin</span>
              )}
            </div>
          </div>

          {user.role !== "admin" && (
            <div className="flex gap-2">
              <Button size="sm" variant="destructive">
                <UserX className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
