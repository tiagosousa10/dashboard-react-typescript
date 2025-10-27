import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import dolarImg from "../../assets/dollar.svg";
import arrowUpImg from "../../assets/arrow-up.svg";
import arrowDownImg from "../../assets/arrow-down.svg";
import CountUp from "react-countup";

interface IWalletBoxProps {
  title: string;
  amount: number;
  footerLabel: string;
  icon: "dolar" | "arrowUp" | "arrowDown";
}

const WalletBox = ({ title, amount, footerLabel, icon }: IWalletBoxProps) => {
  const iconSelected = useMemo(() => {
    switch (icon) {
      case "dolar":
        return dolarImg;
      case "arrowUp":
        return arrowUpImg;
      case "arrowDown":
        return arrowDownImg;
      default:
        return undefined;
    }
  }, [icon]);

  const getCardColor = () => {
    switch (icon) {
      case "dolar":
        return "bg-gradient-to-br from-blue-500 to-blue-600";
      case "arrowUp":
        return "bg-gradient-to-br from-green-500 to-green-600";
      case "arrowDown":
        return "bg-gradient-to-br from-red-500 to-red-600";
      default:
        return "bg-gradient-to-br from-gray-500 to-gray-600";
    }
  };

  return (
    <Card
      className={`relative overflow-hidden shadow-medium hover:shadow-strong transition-all duration-300 hover:scale-105 ${getCardColor()}`}
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium text-white">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="text-3xl font-bold text-white mb-2">
          <span className="text-lg">€</span>
          <CountUp end={amount} separator="." decimal="," decimals={2} />
        </div>
        <p className="text-xs text-white/80">{footerLabel}</p>
        <img
          src={iconSelected}
          alt={title}
          className="absolute -top-2 -right-8 h-full opacity-30"
        />
      </CardContent>
    </Card>
  );
};

export default WalletBox;
