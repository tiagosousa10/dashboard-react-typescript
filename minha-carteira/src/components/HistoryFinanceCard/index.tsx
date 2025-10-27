import { Card, CardContent } from "@/components/ui/card";

interface IHistoryFinanceCardProps {
  tagColor: string;
  title: string;
  subtitle: string;
  amount: string;
}

const HistoryFinanceCard = ({
  tagColor,
  title,
  subtitle,
  amount,
}: IHistoryFinanceCardProps) => {
  return (
    <Card
      className="relative bg-card border-l-4 cursor-pointer transition-all duration-300 hover:opacity-70 hover:translate-x-2 animate-slide-up"
      style={{ borderLeftColor: tagColor }}
    >
      <CardContent className="flex justify-between items-center p-4">
        <div className="flex flex-col justify-between pl-4">
          <span className="text-xl font-medium text-card-foreground">
            {title}
          </span>
          <small className="text-sm text-muted-foreground">{subtitle}</small>
        </div>
        <h3 className="text-lg font-semibold text-card-foreground">{amount}</h3>
      </CardContent>
    </Card>
  );
};

export default HistoryFinanceCard;
