"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Simulação de dados
const isAdmin = true;
const groupName = "Grupo A";
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
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">{groupName} - Eventos</h1>
        {isAdmin && <Button size="sm">Criar evento</Button>}
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

      {events.length === 0 && (
        <p className="text-sm text-muted-foreground">
          Nenhum evento disponível.
        </p>
      )}
    </div>
  );
}
