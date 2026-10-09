
import React from 'react';
import { ShopItem } from "../ShopItem";
import { Zap, Trophy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface UpgradeData {
  id: string;
  name: string;
  description: string;
  cost: number;
  level: number;
  maxLevel: number;
  icon: React.ReactNode;
}

interface UpgradesTabProps {
  coins: number;
  purchasedUpgrades: string[];
  onUpgradePurchase: (id: string, cost: number) => void;
}

const UpgradesTab: React.FC<UpgradesTabProps> = ({ 
  coins, 
  purchasedUpgrades, 
  onUpgradePurchase 
}) => {
  const { toast } = useToast();
  
  // Upgrades data without multiplier upgrades
  const upgradesData = [
    {
      id: "click_power_1",
      name: "Мощный клик",
      description: "Увеличивает монеты за клик на +1",
      cost: 500,
      level: purchasedUpgrades.includes("click_power_1") ? 1 : 0,
      maxLevel: 1,
      icon: <Zap className="text-yellow-400" />
    },
    {
      id: "passive_income_1",
      name: "Пассивный доход",
      description: "Добавляет +1 монету в секунду",
      cost: 2000,
      level: purchasedUpgrades.includes("passive_income_1") ? 1 : 0,
      maxLevel: 1,
      icon: <Trophy className="text-blue-400" />
    },
    {
      id: "click_power_2",
      name: "Супер клик",
      description: "Увеличивает монеты за клик на +5",
      cost: 5000,
      level: purchasedUpgrades.includes("click_power_2") ? 1 : 0,
      maxLevel: 1,
      icon: <Zap className="text-orange-400" />
    },
    {
      id: "passive_income_2",
      name: "Улучшенный доход",
      description: "Добавляет +3 монеты в секунду",
      cost: 7500,
      level: purchasedUpgrades.includes("passive_income_2") ? 1 : 0,
      maxLevel: 1,
      icon: <Trophy className="text-purple-400" />
    },
    {
      id: "click_power_3",
      name: "Мега клик",
      description: "Увеличивает монеты за клик на +10",
      cost: 15000,
      level: purchasedUpgrades.includes("click_power_3") ? 1 : 0,
      maxLevel: 1,
      icon: <Zap className="text-red-500" />
    },
    {
      id: "passive_income_3",
      name: "Мега доход",
      description: "Добавляет +7 монет в секунду",
      cost: 20000,
      level: purchasedUpgrades.includes("passive_income_3") ? 1 : 0,
      maxLevel: 1,
      icon: <Trophy className="text-green-500" />
    }
  ];

  const handleUpgradePurchase = (id: string, cost: number) => {
    if (coins >= cost) {
      onUpgradePurchase(id, cost);
      toast({
        title: "Улучшение куплено!",
        description: `Вы приобрели новое улучшение`,
        variant: "default"
      });
    } else {
      toast({
        title: "Недостаточно монет",
        description: "Кликайте больше, чтобы заработать монеты",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {upgradesData.map((upgrade) => (
        <ShopItem
          key={upgrade.id}
          name={upgrade.name}
          description={upgrade.description}
          cost={upgrade.cost}
          level={upgrade.level}
          maxLevel={upgrade.maxLevel}
          affordable={coins >= upgrade.cost}
          onClick={() => handleUpgradePurchase(upgrade.id, upgrade.cost)}
          icon={upgrade.icon}
        />
      ))}
    </div>
  );
};

export default UpgradesTab;
