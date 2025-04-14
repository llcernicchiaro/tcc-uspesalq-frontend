import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function GroupDetail() {
  const group = {
    name: "Treino Terça",
    role: "admin",
  };

  const trainings = [
    { id: 1, title: "Intervalado 6x400m", date: "15/04 - 07:00", inscritos: 8 },
    { id: 2, title: "Tiro progressivo", date: "18/04 - 07:00", inscritos: 12 },
  ];

  const events = [
    { id: 1, title: "Treinão da Cidade", date: "21/04 - 08:00", inscritos: 20 },
  ];

  const participants = [
    { id: 1, name: "Lorenzo", role: "admin" },
    { id: 2, name: "Carla", role: "participant" },
    { id: 3, name: "João", role: "participant" },
  ];

  const performance = [
    { id: 1, date: "08/04", treino: "Longão", pace: "5:12/km" },
    { id: 2, date: "11/04", treino: "Tiro 200m", pace: "4:45/km" },
  ];

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">{group.name}</h2>
        <Badge variant="outline">{group.role}</Badge>
      </div>

      <Tabs defaultValue="treinos" className="w-full">
        <TabsList className="grid grid-cols-4">
          <TabsTrigger value="treinos">Treinos</TabsTrigger>
          <TabsTrigger value="eventos">Eventos</TabsTrigger>
          <TabsTrigger value="participantes">Participantes</TabsTrigger>
          <TabsTrigger value="desempenho">Desempenho</TabsTrigger>
        </TabsList>

        <TabsContent value="treinos">
          <Card>
            <CardHeader>
              <CardTitle>Treinos do grupo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {trainings.map((t) => (
                <div key={t.id} className="flex justify-between text-sm">
                  <div>
                    <p>{t.title}</p>
                    <p className="text-muted-foreground text-xs">{t.date}</p>
                  </div>
                  <Badge>{t.inscritos} inscritos</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="eventos">
          <Card>
            <CardHeader>
              <CardTitle>Eventos do grupo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {events.map((e) => (
                <div key={e.id} className="flex justify-between text-sm">
                  <div>
                    <p>{e.title}</p>
                    <p className="text-muted-foreground text-xs">{e.date}</p>
                  </div>
                  <Badge>{e.inscritos} inscritos</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="participantes">
          <Card>
            <CardHeader>
              <CardTitle>Participantes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {participants.map((p) => (
                <div key={p.id} className="flex justify-between text-sm">
                  <p>{p.name}</p>
                  <Badge variant="outline">{p.role}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="desempenho">
          <Card>
            <CardHeader>
              <CardTitle>Seus Desempenhos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {performance.map((p) => (
                <div key={p.id} className="flex justify-between text-sm">
                  <div>
                    <p>{p.treino}</p>
                    <p className="text-muted-foreground text-xs">{p.date}</p>
                  </div>
                  <Badge>{p.pace}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
