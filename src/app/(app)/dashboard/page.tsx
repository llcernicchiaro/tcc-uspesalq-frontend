"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toogle";
import { Bell } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Dashboard() {
  const { data: session } = useSession();

  if (!session?.user) return <p className="p-4">Carregando perfil...</p>;

  const { name, email, image } = session.user;

  const mockEvents = [
    {
      id: "1",
      name: "Corrida na Orla",
      date: "2025-04-20",
      image: "/images/event1.jpg",
      groupId: "1",
    },
    {
      id: "2",
      name: "Treino Funcional",
      date: "2025-04-25",
      image: "/images/event2.jpg",
      groupId: "1",
    },
  ];

  const mockGroups = [
    {
      id: "1",
      name: "Runners POA",
      members: 24,
      image: "/images/group1.jpg",
    },
    {
      id: "2",
      name: "Equipe Crossfit",
      members: 18,
      image: "/images/group2.jpg",
    },
  ];

  return (
    <div className="p-4 space-y-6">
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

      <div className="p-4 space-y-6">
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
                        {new Date(event.date).toLocaleDateString()}
                      </p>
                    </div>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        </section>

        <Separator />

        {/* Seção de grupos */}
        <section>
          <h2 className="text-xl font-semibold mb-2">Meus Grupos</h2>
          <div className="space-y-3">
            {mockGroups.map((group) => (
              <Card key={group.id}>
                <Link href={`/groups/${group.id}/events`}>
                  <CardContent className="p-3 flex gap-3 items-center">
                    <Avatar className="h-12 w-12">
                      <AvatarImage
                        src={group.image || undefined}
                        alt={group.name}
                      />
                      <AvatarFallback>{group.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{group.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {group.members} participantes
                      </p>
                    </div>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
