"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const isAdmin = false;

const performances = [
  { event: "Corrida 01", date: "2025-03-15", time: "00:27:30", seconds: 1650 },
  { event: "Corrida 02", date: "2025-03-30", time: "00:26:10", seconds: 1570 },
  { event: "Corrida 03", date: "2025-04-10", time: "00:25:45", seconds: 1545 },
];

export default function PerformancePage() {
  return (
    <div className="p-4 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Desempenho</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={performances}>
              <XAxis dataKey="event" />
              <YAxis domain={["auto", "auto"]} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="seconds"
                stroke="#3b82f6"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>

          {performances.map((p, i) => (
            <div key={i} className="flex justify-between text-sm border-b pb-2">
              <div>
                <p className="font-medium">{p.event}</p>
                <p className="text-muted-foreground text-xs">{p.date}</p>
              </div>
              <p className="font-mono">{p.time}</p>
            </div>
          ))}

          {!isAdmin && <Button className="w-full">Registrar desempenho</Button>}
        </CardContent>
      </Card>
    </div>
  );
}
