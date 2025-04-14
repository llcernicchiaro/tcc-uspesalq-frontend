"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useState } from "react";

export default function EditEventPage() {
  const [form, setForm] = useState({
    name: "Corrida no Parque",
    date: "2025-04-30",
    location: "Parque Farroupilha",
    description: "Evento leve para iniciantes.",
    maxParticipants: 50,
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: Chamar API para salvar evento
    console.log("Evento atualizado:", form);
  }

  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <CardTitle>Editar Evento</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <Label>Nome</Label>
              <Input name="name" value={form.name} onChange={handleChange} />
            </div>
            <div>
              <Label>Data</Label>
              <Input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label>Local</Label>
              <Input
                name="location"
                value={form.location}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label>Descrição</Label>
              <Textarea
                name="description"
                value={form.description}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label>Limite de Participantes</Label>
              <Input
                type="number"
                name="maxParticipants"
                value={form.maxParticipants}
                onChange={handleChange}
              />
            </div>

            <Button type="submit" className="w-full">
              Salvar alterações
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
