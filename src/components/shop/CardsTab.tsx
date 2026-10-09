
import React from 'react';
import CardItem from "../CardItem";
import { TrendingUp, Zap, Trophy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CardData {
  id: number;
  name: string;
  description: string;
  cost: number;
  income: number;
  type: string;
  owned: boolean;
  icon: React.ReactNode;
}

interface CardsTabProps {
  coins: number;
  coinsPerClick: number;
  passiveIncome: number;
  purchasedCards: number[];
  onCardPurchase: (id: number, cost: number) => void;
}

const CardsTab: React.FC<CardsTabProps> = ({ 
  coins, 
  coinsPerClick,
  passiveIncome,
  purchasedCards,
  onCardPurchase
}) => {
  const { toast } = useToast();

  // Cards data without platinum cards
  const cardsData = [
    {
      id: 1,
      name: "Золотая карта клика",
      description: "Добавляет +10 монет за клик",
      cost: 25000,
      income: 10,
      type: "click",
      owned: purchasedCards.includes(1),
      icon: <Zap className="text-yellow-400" />
    },
    {
      id: 2,
      name: "Золотая карта дохода",
      description: "Добавляет +15 монет в секунду",
      cost: 50000,
      income: 15,
      type: "passive",
      owned: purchasedCards.includes(2),
      icon: <Trophy className="text-yellow-400" />
    },
    {
      id: 3,
      name: "Серебряная карта",
      description: "Добавляет +5 монет за клик и +5 в секунду",
      cost: 15000,
      income: 5,
      type: "mixed",
      owned: purchasedCards.includes(3),
      icon: <TrendingUp className="text-gray-400" />
    }
  ];

  const handleCardPurchase = (id: number, cost: number) => {
    if (coins >= cost) {
      onCardPurchase(id, cost);
      toast({
        title: "Карта куплена!",
        description: `Вы приобрели новую карту`,
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
      {cardsData.map((card) => (
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

export default CardsTab;
