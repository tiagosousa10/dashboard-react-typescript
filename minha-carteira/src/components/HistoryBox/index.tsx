import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import formatCurrency from "../../utils/formatCurrency";

interface IHistoryBoxProps {
  data: {
    month: string;
    amountEntry: number;
    amountOutput: number;
  }[];
  lineColorAmountEntry: string;
  lineColorAmountOutput: string;
}

const HistoryBox = ({
  data,
  lineColorAmountEntry,
  lineColorAmountOutput,
}: IHistoryBoxProps) => {
  console.log("HistoryBox received data:", data);

  return (
    <Card className="shadow-medium">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-card-foreground">
          Histórico do Saldo
        </CardTitle>
        <div className="flex gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: lineColorAmountEntry }}
            />
            <span className="text-sm text-muted-foreground">Entradas</span>
          </div>

          <div className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: lineColorAmountOutput }}
            />
            <span className="text-sm text-muted-foreground">Saídas</span>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#64748b" />
              <XAxis dataKey="month" stroke="#64748b" />
              <Tooltip formatter={(value) => formatCurrency(Number(value))} />
              <Line
                type={"monotone"}
                dataKey={"amountEntry"}
                name="Entradas"
                stroke={lineColorAmountEntry}
                strokeWidth={5}
                dot={{ r: 5 }}
                activeDot={{ r: 8 }}
              />
              <Line
                type={"monotone"}
                dataKey={"amountOutput"}
                name="Saídas"
                stroke={lineColorAmountOutput}
                strokeWidth={5}
                dot={{ r: 5 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default HistoryBox;
