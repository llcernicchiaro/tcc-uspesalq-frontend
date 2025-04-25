"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";

// Simulação de dados
const isAdmin = true;
const events = [
  {
    id: "1",
    name: "Corrida na Redenção",
    date: "2025-04-20",
    location: "Porto Alegre",
  },
  {
    id: "2",
    name: "Desafio dos 5k",
    date: "2025-05-05",
    location: "Parque Marinha",
  },
];

export default function GroupEventsPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">Próximos eventos</h1>
        {isAdmin && (
          <Button size="sm">
            <Plus />
            Criar evento
          </Button>
        )}
      </div>

      {events.map((event) => (
        <Card
          key={event.id}
          className="cursor-pointer hover:shadow-md transition"
        >
          <CardHeader>
            <CardTitle className="text-base">{event.name}</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            <p>📍 {event.location}</p>
            <p>📅 {event.date}</p>
          </CardContent>
        </Card>
      ))}

      <h1 className="text-lg font-semibold">Eventos passados</h1>
      {events.map((event) => (
        <Card
          key={event.id}
          className="cursor-pointer hover:shadow-md transition"
        >
          <CardHeader>
            <CardTitle className="text-base">{event.name}</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            <p>📍 {event.location}</p>
            <p>📅 {event.date}</p>
          </CardContent>
        </Card>
      ))}

      {events.length === 0 && (
        <p className="text-sm text-muted-foreground">
          Nenhum evento disponível.
        </p>
      )}
    </div>
  );
}
