import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ModeToggle } from "@/components/ui/mode-toogle";
import { Bell } from "lucide-react";

export default function Dashboard() {
  const user = {
    name: "Lorenzo",
    email: "lorenzo@gmail.com",
    picture: "https://lh3.googleusercontent.com/a/default-user",
  };

  const upcomingEvents = [
    {
      id: 1,
      title: "Desafio 10k",
      date: "20/04 - 07:30",
      group: "Corrida do Parque",
      status: "Inscrito",
    },
  ];

  const userGroups = [
    { id: 1, name: "Treino Terça", role: "admin" },
    { id: 2, name: "Treino Sábado", role: "participant" },
  ];

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={user.picture} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">Olá, {user.name}</p>
            <p className="text-xs text-muted-foreground">{user.email}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <ModeToggle />
          <Button variant="outline" size="icon">
            <Bell className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
            <span className="sr-only">Notifications</span>
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm">
                Menu
              </Button>
            </SheetTrigger>
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <SheetContent>
              <p className="font-semibold mb-2">Ações rápidas</p>
              <Button className="mb-2 w-full" variant="default">
                Criar treino
              </Button>
              <Button className="w-full" variant="default">
                Criar evento
              </Button>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Eventos */}
      <section>
        <Card>
          <CardHeader>
            <CardTitle>Próximos Eventos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium">{event.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {event.date} · {event.group}
                  </p>
                </div>
                <Badge>{event.status}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      {/* Grupos */}
      <section>
        <Card>
          <CardHeader>
            <CardTitle>Seus Grupos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {userGroups.map((group) => (
              <div key={group.id} className="flex justify-between items-center">
                <p className="text-sm">{group.name}</p>
                <Badge variant="outline">{group.role}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
