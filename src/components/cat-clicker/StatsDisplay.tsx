
import React from "react";
import { format } from "@/lib/utils";

interface StatsDisplayProps {
  coins: number;
  coinsPerClick: number;
  passiveIncome: number;
}

const StatsDisplay: React.FC<StatsDisplayProps> = ({
  coins,
  coinsPerClick,
  passiveIncome,
}) => {
  return (
    <div className="mt-4">
      <div className="flex justify-between items-center mb-2">
        <div className="text-sm text-muted-foreground">
          Монеты: <span className="font-medium text-foreground">{format(coins)}</span>
        </div>
      </div>
      
      <div className="flex justify-center items-center space-x-4">
        <div className="text-sm text-muted-foreground">
          Клик + <span className="font-medium text-foreground">{format(coinsPerClick)}</span>
        </div>
        <div className="text-sm text-muted-foreground">
          Пассивный доход: <span className="font-medium text-foreground">{format(passiveIncome)}/сек</span>
        </div>
      </div>
    </div>
  );
};

export default StatsDisplay;
