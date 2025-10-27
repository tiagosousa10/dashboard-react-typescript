import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface IPieChartProps {
  data: {
    name: string;
    value: number;
    percent: number;
    color: string;
  }[];
}

const PieChartBox = ({ data }: IPieChartProps) => {
  console.log("PieChartBox received data:", data);

  return (
    <Card className="shadow-medium">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-card-foreground">
          Relação
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col lg:flex-row items-center gap-6">
        <div className="flex flex-col gap-4">
          {data.map((indicator) => (
            <div key={indicator.name} className="flex items-center gap-3">
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: indicator.color }}
              />
              <div className="text-sm">
                <span className="font-semibold text-card-foreground">
                  {indicator.percent}%
                </span>
                <span className="text-muted-foreground ml-2">
                  {indicator.name}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="w-full lg:w-48 h-48">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey={"percent"}
                cx="50%"
                cy="50%"
                outerRadius={80}
              >
                {data.map((indicator) => (
                  <Cell key={indicator.name} fill={indicator.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default PieChartBox;
