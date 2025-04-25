"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const isAdmin = false;
const isSubscribed = false;

const event = {
  name: "Corrida na Redenção",
  date: "2025-04-20",
  location: "Porto Alegre",
  description: "Corrida leve de 5km para todos os níveis.",
  maxParticipants: 30,
  currentParticipants: 22,
};

export default function EventDetailPage() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>{event.name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>
            <strong>📅 Data:</strong> {event.date}
          </p>
          <p>
            <strong>📍 Local:</strong> {event.location}
          </p>
          <p>
            <strong>👥 Participantes:</strong> {event.currentParticipants} /{" "}
            {event.maxParticipants ?? "∞"}
          </p>
          {event.description && (
            <p>
              <strong>📝 Descrição:</strong> {event.description}
            </p>
          )}
        </CardContent>
      </Card>

      {!isAdmin && (
        <div>
          {isSubscribed ? (
            <Button variant="secondary" className="w-full">
              Cancelar inscrição
            </Button>
          ) : (
            <Button className="w-full">Inscrever-se</Button>
          )}
        </div>
      )}

      {isAdmin && (
        <div className="flex gap-2">
          <Button variant="outline" className="w-full">
            Editar evento
          </Button>
          <Button variant="destructive" className="w-full">
            Excluir evento
          </Button>
        </div>
      )}
    </div>
  );
}
