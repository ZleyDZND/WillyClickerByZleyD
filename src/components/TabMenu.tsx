
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UpgradesTab from "./shop/UpgradesTab";
import CardsTab from "./shop/CardsTab";
import SpecialCardsTab from "./shop/SpecialCardsTab";
import { useGameStore } from "@/stores/use-game-store";

interface TabMenuProps {
  coins: number;
  coinsPerClick: number;
  passiveIncome: number;
  onPurchase: (id: number, cost: number) => void;
  onSelect: (id: number) => void;
  selectedSkinId: number;
  ownedSkins: number[];
  onUpgradePurchase: (id: string, cost: number) => void;
}

const TabMenu = ({ 
  coins, 
  coinsPerClick, 
  passiveIncome,
  onPurchase, 
  onSelect, 
  selectedSkinId, 
  ownedSkins,
  onUpgradePurchase
}: TabMenuProps) => {
  // Track purchased items in local state
  const [purchasedUpgrades, setPurchasedUpgrades] = useState<string[]>([]);
  const [purchasedCards, setPurchasedCards] = useState<number[]>([]);

  // Get purchased items from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('catClickerSave');
    if (savedData) {
      try {
        const data = JSON.parse(savedData);
        // If there are purchased upgrades in localStorage, use them
        if (data.purchasedUpgrades) {
          setPurchasedUpgrades(data.purchasedUpgrades);
        }
        // If there are purchased cards in localStorage, use them
        if (data.purchasedCards) {
          setPurchasedCards(data.purchasedCards);
        }
      } catch (error) {
        console.error('Error loading purchased items data', error);
      }
    }
  }, []);

  const handleUpgradePurchase = (id: string, cost: number) => {
    onUpgradePurchase(id, cost);
    
    // Update local state
    setPurchasedUpgrades(prev => [...prev, id]);
    
    // Update localStorage
    const savedData = localStorage.getItem('catClickerSave');
    if (savedData) {
      try {
        const data = JSON.parse(savedData);
        const updatedPurchasedUpgrades = [...(data.purchasedUpgrades || []), id];
        localStorage.setItem('catClickerSave', JSON.stringify({
          ...data,
          purchasedUpgrades: updatedPurchasedUpgrades
        }));
      } catch (error) {
        console.error('Error updating purchased upgrades data', error);
      }
    }
  };

  const handleCardPurchase = (id: number, cost: number) => {
    onUpgradePurchase(`card_${id}`, cost);
    
    // Update local state
    setPurchasedCards(prev => [...prev, id]);
    
    // Update localStorage
    const savedData = localStorage.getItem('catClickerSave');
    if (savedData) {
      try {
        const data = JSON.parse(savedData);
        const updatedPurchasedCards = [...(data.purchasedCards || []), id];
        localStorage.setItem('catClickerSave', JSON.stringify({
          ...data,
          purchasedCards: updatedPurchasedCards
        }));
      } catch (error) {
        console.error('Error updating purchased cards data', error);
      }
    }
  };

  return (
    <Tabs defaultValue="upgrades" className="w-full">
      <TabsList className="grid grid-cols-3 mb-4">
        <TabsTrigger value="upgrades">Улучшения</TabsTrigger>
        <TabsTrigger value="cards">Карты</TabsTrigger>
        <TabsTrigger value="special">Особые</TabsTrigger>
      </TabsList>
      
      <TabsContent value="upgrades" className="space-y-4">
        <UpgradesTab 
          coins={coins} 
          purchasedUpgrades={purchasedUpgrades} 
          onUpgradePurchase={handleUpgradePurchase} 
        />
      </TabsContent>
      
      <TabsContent value="cards" className="space-y-4">
        <CardsTab 
          coins={coins} 
          coinsPerClick={coinsPerClick} 
          passiveIncome={passiveIncome}
          purchasedCards={purchasedCards} 
          onCardPurchase={handleCardPurchase} 
        />
      </TabsContent>
      
      <TabsContent value="special" className="space-y-4">
        <SpecialCardsTab 
          coins={coins} 
          coinsPerClick={coinsPerClick} 
          passiveIncome={passiveIncome}
          purchasedCards={purchasedCards} 
          onCardPurchase={handleCardPurchase} 
        />
      </TabsContent>
    </Tabs>
  );
};

export default TabMenu;
