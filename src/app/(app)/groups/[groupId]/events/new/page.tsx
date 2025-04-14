"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type EventFormData = {
  name: string;
  date: string;
  location: string;
  description?: string;
  maxParticipants?: number;
};

export default function NewEventPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EventFormData>();

  const onSubmit = (data: EventFormData) => {
    console.log("Novo evento:", data);
    // Enviar para o backend com fetch/axios
  };

  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <CardTitle>Criar novo evento</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label>Nome do evento</Label>
              <Input {...register("name", { required: true })} />
              {errors.name && (
                <p className="text-red-500 text-sm">Campo obrigatório</p>
              )}
            </div>

            <div>
              <Label>Data</Label>
              <Input type="date" {...register("date", { required: true })} />
              {errors.date && (
                <p className="text-red-500 text-sm">Campo obrigatório</p>
              )}
            </div>

            <div>
              <Label>Local</Label>
              <Input {...register("location", { required: true })} />
              {errors.location && (
                <p className="text-red-500 text-sm">Campo obrigatório</p>
              )}
            </div>

            <div>
              <Label>Descrição</Label>
              <Textarea {...register("description")} />
            </div>

            <div>
              <Label>Limite de participantes</Label>
              <Input type="number" min={1} {...register("maxParticipants")} />
            </div>

            <Button type="submit" className="w-full">
              Salvar
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
