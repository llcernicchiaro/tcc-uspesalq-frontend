"use client";

import React from "react";
import Link from "next/link";
import { Lock, Unlock, Users } from "lucide-react";
import {
  Card,
  CardAction,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Group } from "@/types";
import { useRouter } from "next/navigation";
import { useJoinGroup } from "@/hooks/useJoinGroup";

export const GroupCardContent: React.FC<{
  group: Group;
  onlyContent?: boolean;
}> = ({ group, onlyContent }) => {
  const router = useRouter();
  const { joinGroup, isJoining } = useJoinGroup();

  const handleAction = async () => {
    if (group.isMember) {
      // Redirect to group events
      router.push(`/groups/${group.id}/events`);
      return;
    }

    try {
      await joinGroup(group.id);
    } catch (error) {
      console.error("Erro ao entrar no grupo", error);
    }
  };

  return (
    <>
      <CardHeader className="flex flex-row items-center justify-between gap-2">
        <div className="flex flex-row items-center gap-2">
          <Avatar className="h-12 w-12">
            <AvatarImage src={group.imageUrl || undefined} alt={group.name} />
            <AvatarFallback>{group.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="font-semibold text-lg">
              {group.name}
            </CardTitle>
            <span className="text-sm text-muted-foreground truncate">
              {group.description}
            </span>
          </div>
        </div>
        <CardAction className="flex flex-col items-center justify-center">
          <Badge
            variant={group.type === "open" ? "success" : "destructive"}
            className="rounded-full px-1 py-1 text-xs font-medium"
          >
            {group.type === "open" ? (
              <Unlock className="w-4 h-4" />
            ) : (
              <Lock className="w-4 h-4" />
            )}
          </Badge>
          <div className="flex flex-row items-center py-2 gap-1 text-muted-foreground">
            <Users className="w-4 h-4" />
            <span className="text-sm">{group.membersCount}</span>
          </div>
        </CardAction>
      </CardHeader>
      {!group.isMember && !onlyContent && (
        <CardFooter>
          <Button
            size="sm"
            className="text-sm mt-2 w-full"
            variant={group.isMember ? "outline" : "default"}
            disabled={isJoining}
            onClick={handleAction}
          >
            {group.isMember || group.role
              ? "Acessar"
              : group.type === "open"
              ? "Participar"
              : "Pedir para participar"}
          </Button>
        </CardFooter>
      )}
    </>
  );
};

const GroupCard: React.FC<{ group: Group }> = ({ group }) => (
  <Card
    key={group.id}
    className="gap-2 border p-2 rounded-xl hover:bg-muted transition-colors"
  >
    <Link href={`/groups/${group.id}/events`}>
      <GroupCardContent group={group} />
    </Link>
  </Card>
);

export default GroupCard;
