"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGroup } from "@/hooks/useGroup";
import { useParams } from "next/navigation";

const currentUserId = "user-1";
const isAdmin = true;

export default function ParticipantsPage() {
  const params = useParams();
  const groupId = params.groupId;

  const { group } = useGroup(groupId as string);

  return (
    <div className="p-4 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Participantes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
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

              {isAdmin && user.id !== currentUserId && (
                <div className="flex gap-2">
                  {user.role === "participant" ? (
                    <Button size="sm" variant="outline">
                      Promover
                    </Button>
                  ) : (
                    <Button size="sm" variant="secondary">
                      Remover admin
                    </Button>
                  )}
                  <Button size="sm" variant="destructive">
                    Remover
                  </Button>
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
