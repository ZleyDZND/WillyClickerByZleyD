
import React from 'react';
import CardItem from "../CardItem";
import { Diamond, Award } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useGameStore } from "@/stores/use-game-store";

interface SpecialCardData {
  id: number;
  name: string;
  description: string;
  cost: number;
  income: number;
  type: string;
  owned: boolean;
  icon: React.ReactNode;
}

interface SpecialCardsTabProps {
  coins: number;
  coinsPerClick: number;
  passiveIncome: number;
  purchasedCards: number[];
  onCardPurchase: (id: number, cost: number) => void;
}

const SpecialCardsTab: React.FC<SpecialCardsTabProps> = ({ 
  coins, 
  coinsPerClick,
  passiveIncome,
  purchasedCards,
  onCardPurchase
}) => {
  const { toast } = useToast();
  const gameStore = useGameStore();

  // Special cards data with multiplier effects
  const specialCardsData = [
    {
      id: 6,
      name: "Алмазная карта клика",
      description: "Умножает монеты за клик в 5 раз",
      cost: 2000000,
      income: coinsPerClick * 4,
      type: "click_multiplier",
      owned: purchasedCards.includes(6),
      icon: <Diamond className="text-cyan-400" />
    },
    {
      id: 7,
      name: "Алмазная карта дохода",
      description: "Умножает пассивный доход в 5 раз",
      cost: 5000000,
      income: passiveIncome * 4,
      type: "passive_multiplier",
      owned: purchasedCards.includes(7),
      icon: <Award className="text-cyan-400" />
    }
  ];

  const handleCardPurchase = (id: number, cost: number) => {
    if (coins >= cost) {
      // Apply special card effects when purchased
      if (id === 6) { // Diamond click multiplier card
        const newCoinsPerClick = coinsPerClick * 5;
        gameStore.setCoinsPerClick(newCoinsPerClick);
        toast({
          title: "Карта куплена!",
          description: `Ваш доход за клик увеличен в 5 раз! (${coinsPerClick} → ${newCoinsPerClick})`,
          variant: "default"
        });
      } else if (id === 7) { // Diamond passive income multiplier card
        const newPassiveIncome = passiveIncome * 5;
        gameStore.setPassiveIncome(newPassiveIncome);
        toast({
          title: "Карта куплена!",
          description: `Ваш пассивный доход увеличен в 5 раз! (${passiveIncome} → ${newPassiveIncome})`,
          variant: "default"
        });
      }
      
      onCardPurchase(id, cost);
    } else {
      toast({
        title: "Недостаточно монет",
        description: "Кликайте больше, чтобы заработать монеты",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {specialCardsData.map((card) => (
        <CardItem
          key={card.id}
          id={card.id}
          name={card.name}
          description={card.description}
          cost={card.cost}
          income={card.income}
          owned={card.owned}
          affordable={coins >= card.cost}
          onClick={() => handleCardPurchase(card.id, card.cost)}
        />
      ))}
    </div>
  );
};

export default SpecialCardsTab;
