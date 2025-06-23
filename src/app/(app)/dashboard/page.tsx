import Link from "next/link";
import { Bell } from "lucide-react";
import { Suspense } from "react";

import { auth } from "@/auth";
import { fetchMyGroups } from "@/lib/api";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import { ModeToggle } from "@/components/ui/mode-toogle";
import { ErrorToast } from "@/components/ErrorToast";

import type { Group } from "@/types";
import EmptyGroupList from "@/components/EmptyGroupList";
import GroupCard from "@/components/GroupCard";

export default async function Dashboard() {
  const session = await auth();
  // const nextEvents = await fetchNextEvents();
  let groups: Group[] = [];
  let errorMessage = "";

  try {
    groups = await fetchMyGroups();
  } catch (err: unknown) {
    if (err instanceof Error) {
      errorMessage = err.message;
    } else {
      errorMessage = "An unknown error occurred.";
    }
  }

  if (!session?.user) return <p className="p-4">Carregando perfil...</p>;

  const { name, email, image } = session.user;

  const mockEvents = [
    {
      id: "1",
      name: "Corrida pelo título",
      date: "26 de junho - 13:00", 
      image: "https://www.gaveanews.com/wp-content/uploads/Bandeira-do-Gremio.webp",
      groupName: "Gremistas",
    },
    {
      id: "2",
      name: "Corrida de São João",
      date: "30 de junho - 15:00",
      image: "https://blog.ciaathletica.com.br/wp-content/uploads/2020/05/Grupo-de-corrida-4-segredos-para-escolher-o-seu-2.png",
      groupName: "Amigos que correm",
    },
  ];

  const mockGroups = [
    {
      id: "1",
      name: "Amigos que correm",
      description: "Grupo de amigos que gostam de correr juntos",
      imageUrl: "https://blog.ciaathletica.com.br/wp-content/uploads/2020/05/Grupo-de-corrida-4-segredos-para-escolher-o-seu-2.png",
      type: "open",
      membersCount: 10,
      isMember: true,
    },
    {
      id: "2",
      name: "Gremistas",
      description: "Grupo de corridas do Grêmio",
      imageUrl: "https://www.gaveanews.com/wp-content/uploads/Bandeira-do-Gremio.webp",
      type: "closed",
      membersCount: 50,
      isMember: true,
    },
  ];

  return (
    <div className="p-4 space-y-6">
      {errorMessage && <ErrorToast error={errorMessage} />}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={image || undefined} alt={name || "Avatar"} />
            <AvatarFallback>{name?.charAt(0) || "A"}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">Olá, {name}</p>
            <p className="text-xs text-muted-foreground">{email}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <ModeToggle />
          <Button variant="outline" size="icon">
            <Bell className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
            <span className="sr-only">Notifications</span>
          </Button>
        </div>
      </div>
      <Separator />
      <div className="space-y-6">
        {/* Seção de eventos */}
        <section>
          <h2 className="text-xl font-semibold mb-2">Próximos Eventos</h2>
          <div className="space-y-3">
            {mockEvents.map((event) => (
              <Card key={event.id}>
                <Link href={`/groups/${event.groupId}/events/${event.id}`}>
                  <CardContent className="p-3 flex gap-3 items-center">
                    <Avatar className="h-12 w-12">
                      <AvatarImage
                        src={event.image || undefined}
                        alt={event.name}
                      />
                      <AvatarFallback>{event.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{event.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {event.groupName}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {event.date}
                      </p>
                    </div>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        </section>

        <Separator />

        <Suspense
          fallback={<Skeleton className="w-[100px] h-[20px] rounded-full" />}
        >
          <section>
            <h2 className="text-xl font-semibold mb-2">Meus Grupos</h2>
            <div className="space-y-3">
              {mockGroups.length === 0 && <EmptyGroupList />}
              {mockGroups.length > 0 &&
                mockGroups.map((group) => (
                  <GroupCard key={group.id} group={group} />
                ))}
            </div>
          </section>
        </Suspense>
      </div>
    </div>
  );
}
