"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const currentUserId = "user-1";
const isAdmin = true;

const participants = [
  { id: "user-1", name: "Lorenzo", email: "lorenzo@email.com", role: "admin" },
  {
    id: "user-2",
    name: "Maria",
    email: "maria@email.com",
    role: "participant",
  },
  { id: "user-3", name: "João", email: "joao@email.com", role: "participant" },
];

export default function ParticipantsPage() {
  return (
    <div className="p-4 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Participantes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {participants.map((user) => (
            <div key={user.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage
                    src={`https://ui-avatars.com/api/?name=${user.name}`}
                  />
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
