import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lock, Unlock } from "lucide-react";
import Image from "next/image";

type Group = {
  id: string;
  name: string;
  description?: string;
  participantsCount: number;
  isUserParticipant: boolean;
  coverImageUrl: string;
  isOpen: boolean;
};

const mockGroups: Group[] = [
  {
    id: "1",
    name: "Equipe Corredores da Serra",
    description: "Grupo focado em provas no sul do Brasil.",
    participantsCount: 28,
    isUserParticipant: true, // Altere para testar os dois estados
    coverImageUrl: "https://lh3.googleusercontent.com/a/default-user", // 🔁 mock
    isOpen: true,
  },
  {
    id: "2",
    name: "Equipe Corredores da Serra",
    description: "Grupo focado em provas no sul do Brasil.",
    participantsCount: 28,
    isUserParticipant: true, // Altere para testar os dois estados
    coverImageUrl: "https://lh3.googleusercontent.com/a/default-user", // 🔁 mock
    isOpen: true,
  },
];

export default function GroupsPage() {
  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-semibold">Meus Grupos</h1>
      <Button className="w-full" variant="outline">
        + Criar novo grupo
      </Button>

      {mockGroups.map((group) => (
        <Link key={group.id} href={`/groups/${group.id}/events`}>
          <Card className="flex flex-col sm:flex-row items-center gap-4 border p-4 rounded-xl hover:bg-muted transition-colors">
            {/* Imagem do Grupo */}
            <div className="relative w-16 h-16 sm:w-12 sm:h-12">
              <Image
                src={group.coverImageUrl}
                alt={`Imagem do grupo ${group.name}`}
                fill
                className="rounded-full object-cover"
              />
            </div>

            {/* Informações do Grupo */}
            <CardHeader className="flex-1">
              <CardTitle className="font-semibold text-lg sm:text-xl">
                {group.name}
              </CardTitle>
              <CardContent className="text-sm text-muted-foreground truncate">
                {group.description}
              </CardContent>
            </CardHeader>

            {/* Badge indicando se o grupo é aberto ou fechado */}
            <div className="flex-shrink-0 mt-2 sm:mt-0">
              <Badge
                variant={group.isOpen ? "default" : "destructive"}
                className="flex items-center gap-1"
              >
                {group.isOpen ? (
                  <Unlock className="w-4 h-4" />
                ) : (
                  <Lock className="w-4 h-4" />
                )}
                {group.isOpen ? "Aberto" : "Fechado"}
              </Badge>
            </div>

            {/* Botão de Participar ou Solicitar Acesso */}
            {!group.isUserParticipant && (
              <Button
                size="sm"
                variant={group.isOpen ? "default" : "secondary"}
                className="text-sm mt-2"
              >
                {group.isOpen ? "Participar" : "Solicitar acesso"}
              </Button>
            )}
          </Card>
        </Link>
      ))}
    </div>
  );
}
