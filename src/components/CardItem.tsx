
import React from 'react';
import { Coins, ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface CardItemProps {
  id?: number;
  name: string;
  description: string;
  cost: number;
  income: number;
  owned: boolean;
  affordable: boolean;
  onClick: () => void;
}

const CardItem: React.FC<CardItemProps> = ({
  name,
  description,
  cost,
  income,
  owned,
  affordable,
  onClick,
}) => {
  return (
    <Card 
      className={cn(
        "card-item transition-all duration-200 hover:shadow-lg cursor-pointer border-2",
        owned ? "border-primary/50 bg-primary/5" : 
        affordable ? "border-transparent hover:border-primary/30" : "border-transparent opacity-70 cursor-not-allowed"
      )}
      onClick={() => !owned && affordable && onClick()}
    >
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-semibold text-lg">{name}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
          
          {owned && (
            <Badge variant="default" className="bg-primary/80">
              Куплено
            </Badge>
          )}
        </div>
        
        <div className="flex justify-between items-center">
          <div className={cn("flex items-center gap-1", affordable ? "text-foreground" : "text-muted-foreground")}>
            <Coins size={16} className={affordable ? "text-yellow-500" : "text-muted-foreground"} />
            <span className="font-medium">{cost.toLocaleString()}</span>
          </div>
          
          <div className="flex items-center gap-1 text-green-600">
            <ArrowUp size={16} />
            <span className="font-medium">+{income.toLocaleString()}/сек</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardItem;
