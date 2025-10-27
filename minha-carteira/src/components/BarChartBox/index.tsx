import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, BarChart, Bar, Cell, Tooltip } from "recharts";
import formatCurrency from "../../utils/formatCurrency";

interface IBarCharProps {
  title: string;
  data: {
    name: string;
    amount: number;
    percent: number;
    color: string;
  }[];
}

const BarChartBox = ({ title, data }: IBarCharProps) => {
  return (
    <Card className="shadow-medium">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">
          {title}
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
                <span className="font-semibold text-foreground">
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
            <BarChart data={data}>
              <Bar dataKey={"amount"} name={"Valor"}>
                {data.map((indicator) => (
                  <Cell key={indicator.name} fill={indicator.color} />
                ))}
              </Bar>
              <Tooltip
                cursor={{ fill: "none" }}
                formatter={(value) => formatCurrency(Number(value))}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default BarChartBox;
