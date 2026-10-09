
import React from 'react';
import { Coins } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ShopItemProps {
  name: string;
  description: string;
  cost: number;
  level: number;
  maxLevel: number;
  affordable: boolean;
  onClick: () => void;
  icon?: React.ReactNode; // Added the icon prop as optional
}

export const ShopItem: React.FC<ShopItemProps> = ({
  name,
  description,
  cost,
  level,
  maxLevel,
  affordable,
  onClick,
  icon,
}) => {
  const isMaxLevel = level >= maxLevel;
  
  return (
    <div 
      className={cn(
        "shop-item relative border border-border/50 p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer bg-card animate-slide-in",
        isMaxLevel 
          ? "opacity-70 hover:scale-100 cursor-default" 
          : !affordable 
            ? "opacity-90 hover:scale-100 cursor-not-allowed" 
            : "hover:scale-105"
      )}
      onClick={() => !isMaxLevel && affordable && onClick()}
    >
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="font-semibold text-lg">{name}</h3>
          <p className="text-muted-foreground text-sm">{description}</p>
        </div>
        {icon && <div className="text-primary ml-2">{icon}</div>}
        <div className="flex items-center bg-background px-2 py-1 rounded-md shadow-sm">
          <span className="text-xs font-medium">{level}/{maxLevel}</span>
        </div>
      </div>
      
      <div className="h-2 bg-muted rounded-full overflow-hidden mb-3">
        <div 
          className="bg-primary h-full rounded-full transition-all duration-300"
          style={{ width: `${(level / maxLevel) * 100}%` }}
        />
      </div>
      
      <div className="flex justify-between items-center">
        {isMaxLevel ? (
          <span className="text-sm font-medium text-green-600">Максимальный уровень</span>
        ) : (
          <div className={cn("flex items-center", affordable ? "text-foreground" : "text-muted-foreground")}>
            <Coins size={16} className={affordable ? "text-yellow-500" : "text-muted-foreground"} />
            <span className="ml-1 text-sm font-medium">{cost.toLocaleString()}</span>
          </div>
        )}
        <div className={cn(
          "px-3 py-1 rounded-md text-xs font-medium transition-colors",
          isMaxLevel ? "bg-green-100 text-green-800" :
          affordable ? "bg-primary/10 text-primary hover:bg-primary/20" : 
                      "bg-muted text-muted-foreground"
        )}>
          {isMaxLevel ? "МАКС" : "КУПИТЬ"}
        </div>
      </div>
    </div>
  );
};
