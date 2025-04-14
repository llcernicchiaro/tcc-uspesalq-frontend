"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useParams, usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, UserPlus, LogOut, Lock } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

export default function GroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams(); // Obter os parâmetros da URL
  const pathname = usePathname(); // Obter o caminho atual da URL

  const groupId = params.groupId; // Acessando diretamente o groupId

  // Definir o valor da aba com base no pathname
  const activeTab =
    ["events", "participants", "performance"].find((tab) =>
      pathname.includes(tab)
    ) || "events";

  const groupInfo = {
    name: "Equipe Corredores da Serra",
    description: "Grupo focado em provas no sul do Brasil.",
    participantsCount: 28,
    isUserParticipant: true, // Altere para testar os dois estados
    coverImageUrl: "https://lh3.googleusercontent.com/a/default-user", // 🔁 mock
    isOpen: true,
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/groups">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative w-12 h-12">
          <Image
            src={groupInfo.coverImageUrl}
            alt="Imagem do grupo"
            fill
            className="rounded-full object-cover"
          />
        </div>

        <div>
          <h1 className="text-xl font-bold">{groupInfo.name}</h1>
          <p className="text-muted-foreground text-sm">
            {groupInfo.description}
          </p>
        </div>
      </div>

      <div className="space-y-1">
        <div className="flex items-center justify-between pt-2 text-sm text-muted-foreground">
          <span>{groupInfo.participantsCount} participantes</span>
          <Badge variant={groupInfo.isOpen ? "default" : "destructive"}>
            {groupInfo.isOpen ? "Grupo aberto" : "Grupo fechado"}
          </Badge>
          {groupInfo.isUserParticipant ? (
            <Button
              size="sm"
              variant="outline"
              className="text-sm gap-1 text-red-600 border-red-300 hover:text-white hover:bg-red-600"
            >
              <LogOut className="h-4 w-4" />
              Sair do grupo
            </Button>
          ) : groupInfo.isOpen ? (
            <Button size="sm" variant="default" className="text-sm gap-1">
              <UserPlus className="h-4 w-4" />
              Participar
            </Button>
          ) : (
            <Button size="sm" variant="secondary" className="text-sm gap-1">
              <Lock className="h-4 w-4" />
              Solicitar acesso
            </Button>
          )}
        </div>
      </div>
      <Tabs value={activeTab} className="w-full">
        <TabsList className="grid grid-cols-3">
          <TabsTrigger value="events">
            <Link href={`/groups/${groupId}/events`}>Eventos</Link>
          </TabsTrigger>
          <TabsTrigger value="participants">
            <Link href={`/groups/${groupId}/participants`}>Participantes</Link>
          </TabsTrigger>
          <TabsTrigger value="performance">
            <Link href={`/groups/${groupId}/performance`}>Desempenho</Link>
          </TabsTrigger>
        </TabsList>

        {/* Aqui renderiza o conteúdo das páginas, como eventos, participantes ou desempenho */}
        <div className="mt-4">{children}</div>
      </Tabs>
    </div>
  );
}
