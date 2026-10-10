import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { useGameStore } from '@/stores/use-game-store';
import { Package, Star, Award, Crown, Zap } from 'lucide-react';

interface CaseShopProps {
  coins: number;
  ownedSkins: number[];
  coinsPerClick: number;
  onCaseOpen: (caseId: string, cost: number) => void;
}

interface CaseReward {
  type: 'coins' | 'skin' | 'upgrade';
  value: number | string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  name: string;
  skinId?: number;
  imagePath?: string;
}

const CaseShop: React.FC<CaseShopProps> = ({ 
  coins, 
  ownedSkins, 
  coinsPerClick,
  onCaseOpen 
}) => {
  const [isOpeningCase, setIsOpeningCase] = useState(false);
  const [lastReward, setLastReward] = useState<CaseReward | null>(null);
  const { toast } = useToast();
  const { addCoins, setCoinsPerClick, addOwnedSkin } = useGameStore();

  const willyRewards: CaseReward[] = [
    // Common - Coins (50% chance)
    { type: 'coins', value: 25000, rarity: 'common', name: '25,000 монет' },
    
    // Upgrade (10% chance)
    { type: 'upgrade', value: 5, rarity: 'rare', name: '+5 к клику' },
    
    // Rare skins (25% total, ~8.33% each)
    { 
      type: 'skin', 
      value: 'Какашка Вилли', 
      rarity: 'rare', 
      name: 'Какашка Вилли', 
      skinId: 24,
      imagePath: '/lovable-uploads/1f17a9f9-6010-4c7f-bf25-813e600f4e6e.png'
    },
    { 
      type: 'skin', 
      value: 'Хлебушек Вилли', 
      rarity: 'rare', 
      name: 'Хлебушек Вилли', 
      skinId: 25,
      imagePath: '/lovable-uploads/7873fefb-0b9b-4294-a71a-9e9fdb215334.png'
    },
    { 
      type: 'skin', 
      value: 'Клубника Вилли', 
      rarity: 'rare', 
      name: 'Клубника Вилли', 
      skinId: 26,
      imagePath: '/lovable-uploads/28390614-5871-43aa-ba68-d69f1b0b1a68.png'
    },
    
    // Epic skins (10% total, 2.5% each)
    { 
      type: 'skin', 
      value: 'Чернильный Вилли', 
      rarity: 'epic', 
      name: 'Чернильный Вилли', 
      skinId: 27,
      imagePath: '/lovable-uploads/aac2b114-f2a0-4682-aa2d-b6a586dc17b9.png'
    },
    { 
      type: 'skin', 
      value: 'Страшилка Вилли', 
      rarity: 'epic', 
      name: 'Страшилка Вилли', 
      skinId: 28,
      imagePath: '/lovable-uploads/87e4031b-7db7-41fb-b3d5-2cb74207ab98.png'
    },
    { 
      type: 'skin', 
      value: 'Томас Вилли', 
      rarity: 'epic', 
      name: 'Томас Вилли', 
      skinId: 29,
      imagePath: '/lovable-uploads/bbbb7ef3-be7b-43d2-8485-49151bb80279.png'
    },
    { 
      type: 'skin', 
      value: 'Уолтер Вилли', 
      rarity: 'epic', 
      name: 'Уолтер Вилли', 
      skinId: 30,
      imagePath: '/lovable-uploads/768b884a-8b5f-4ac1-81f4-6362128f8e16.png'
    },
    
    // Legendary skin (5% chance)
    { 
      type: 'skin', 
      value: 'Миаморе Вилли', 
      rarity: 'legendary', 
      name: 'Миаморе Вилли', 
      skinId: 31,
      imagePath: '/lovable-uploads/150b5ffb-6243-45ee-92bb-b6d76ad897b3.png'
    }
  ];

  const tigraRewards: CaseReward[] = [
    // Common - Coins (50% chance)
    { type: 'coins', value: 50000, rarity: 'common', name: '50,000 монет' },
    
    // Upgrade (10% chance)
    { type: 'upgrade', value: 5, rarity: 'rare', name: '+5 к клику' },
    
    // Rare skins (25% total, 12.5% each)
    { 
      type: 'skin', 
      value: 'Пожилой Вилли', 
      rarity: 'rare', 
      name: 'Пожилой Вилли', 
      skinId: 32,
      imagePath: '/lovable-uploads/d2d1f6ba-441f-490a-8ccf-cc4eb80ff9a2.png'
    },
    { 
      type: 'skin', 
      value: 'Деловой Вилли', 
      rarity: 'rare', 
      name: 'Деловой Вилли', 
      skinId: 33,
      imagePath: '/lovable-uploads/a8798ca4-b0ca-4e51-b57b-8e0aa772662c.png'
    },
    
    // Epic skins (12% total, 4% each)
    { 
      type: 'skin', 
      value: 'Пляжный Вилли', 
      rarity: 'epic', 
      name: 'Пляжный Вилли', 
      skinId: 34,
      imagePath: '/lovable-uploads/158a54f5-0f5a-4936-903f-d11a9184da87.png'
    },
    { 
      type: 'skin', 
      value: 'Повар Вилли', 
      rarity: 'epic', 
      name: 'Повар Вилли', 
      skinId: 35,
      imagePath: '/lovable-uploads/26688a77-284a-469c-95e7-a4f175089e66.png'
    },
    { 
      type: 'skin', 
      value: 'Спортсмен Вилли', 
      rarity: 'epic', 
      name: 'Спортсмен Вилли', 
      skinId: 36,
      imagePath: '/lovable-uploads/c78f06c2-e05e-4078-8ac5-7c322d1fc3b6.png'
    },
    
    // Legendary skins (3% total, 1.5% each)
    { 
      type: 'skin', 
      value: 'Японка Вилли', 
      rarity: 'legendary', 
      name: 'Японка Вилли', 
      skinId: 37,
      imagePath: '/lovable-uploads/8b467f2f-9059-4d2c-b660-d2c963258453.png'
    },
    { 
      type: 'skin', 
      value: 'Король Вилли', 
      rarity: 'legendary', 
      name: 'Король Вилли', 
      skinId: 38,
      imagePath: '/lovable-uploads/70fe6fae-7880-4a7e-9c80-f30f102bfe2f.png'
    }
  ];

  const getAvailableRewards = (caseType: 'willy' | 'tigra') => {
    const rewards = caseType === 'willy' ? willyRewards : tigraRewards;
    return rewards.filter(reward => {
      if (reward.type === 'skin' && reward.skinId && ownedSkins.includes(reward.skinId)) {
        return false; // Skip skins that are already owned
      }
      return true;
    });
  };

  const openCase = (caseType: 'willy' | 'tigra') => {
    const cost = caseType === 'willy' ? 125000 : 200000;
    const caseName = caseType === 'willy' ? 'Вилли Кейс' : 'Tigra Кейс';
    
    if (coins < cost) {
      toast({
        title: "Недостаточно монет",
        description: `Вам нужно ${cost.toLocaleString()} монет для открытия ${caseName}`,
        variant: "destructive"
      });
      return;
    }

    setIsOpeningCase(true);
    onCaseOpen(caseType === 'willy' ? 'willy_case' : 'tigra_case', cost);

    // Simulate case opening delay
    setTimeout(() => {
      const availableRewards = getAvailableRewards(caseType);
      let selectedReward: CaseReward;

      const random = Math.random() * 100;

      if (caseType === 'willy') {
        // 50% chance for coins
        if (random <= 50) {
          selectedReward = availableRewards.find(r => r.type === 'coins')!;
        } else if (random <= 60) {
          // 10% chance for upgrade
          selectedReward = availableRewards.find(r => r.type === 'upgrade')!;
        } else if (random <= 85) {
          // 25% chance for rare skins
          const rareSkins = availableRewards.filter(r => r.type === 'skin' && r.rarity === 'rare');
          if (rareSkins.length > 0) {
            selectedReward = rareSkins[Math.floor(Math.random() * rareSkins.length)];
          } else {
            // Fallback to coins if no rare skins available
            selectedReward = availableRewards.find(r => r.type === 'coins')!;
          }
        } else if (random <= 95) {
          // 10% chance for epic skins
          const epicSkins = availableRewards.filter(r => r.type === 'skin' && r.rarity === 'epic');
          if (epicSkins.length > 0) {
            selectedReward = epicSkins[Math.floor(Math.random() * epicSkins.length)];
          } else {
            // Fallback to coins if no epic skins available
            selectedReward = availableRewards.find(r => r.type === 'coins')!;
          }
        } else {
          // 5% chance for legendary skin
          const legendarySkin = availableRewards.find(r => r.type === 'skin' && r.rarity === 'legendary');
          if (legendarySkin && !ownedSkins.includes(legendarySkin.skinId!)) {
            selectedReward = legendarySkin;
          } else {
            // Fallback to coins if legendary skin is already owned
            selectedReward = availableRewards.find(r => r.type === 'coins')!;
          }
        }
      } else {
        // Tigra case logic
        if (random <= 50) {
          // 50% chance for coins
          selectedReward = availableRewards.find(r => r.type === 'coins')!;
        } else if (random <= 60) {
          // 10% chance for upgrade
          selectedReward = availableRewards.find(r => r.type === 'upgrade')!;
        } else if (random <= 85) {
          // 25% chance for rare skins
          const rareSkins = availableRewards.filter(r => r.type === 'skin' && r.rarity === 'rare');
          if (rareSkins.length > 0) {
            selectedReward = rareSkins[Math.floor(Math.random() * rareSkins.length)];
          } else {
            selectedReward = availableRewards.find(r => r.type === 'coins')!;
          }
        } else if (random <= 97) {
          // 12% chance for epic skins
          const epicSkins = availableRewards.filter(r => r.type === 'skin' && r.rarity === 'epic');
          if (epicSkins.length > 0) {
            selectedReward = epicSkins[Math.floor(Math.random() * epicSkins.length)];
          } else {
            selectedReward = availableRewards.find(r => r.type === 'coins')!;
          }
        } else {
          // 3% chance for legendary skins
          const legendarySkins = availableRewards.filter(r => r.type === 'skin' && r.rarity === 'legendary');
          if (legendarySkins.length > 0) {
            selectedReward = legendarySkins[Math.floor(Math.random() * legendarySkins.length)];
          } else {
            selectedReward = availableRewards.find(r => r.type === 'coins')!;
          }
        }
      }

      // Apply the reward
      if (selectedReward.type === 'coins') {
        addCoins(selectedReward.value as number);
      } else if (selectedReward.type === 'upgrade') {
        setCoinsPerClick(coinsPerClick + (selectedReward.value as number));
      } else if (selectedReward.type === 'skin' && selectedReward.skinId) {
        addOwnedSkin(selectedReward.skinId);
      }

      setLastReward(selectedReward);
      setIsOpeningCase(false);
    }, 2000);
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common':
        return 'text-gray-500 border-gray-500';
      case 'rare':
        return 'text-blue-500 border-blue-500';
      case 'epic':
        return 'text-purple-500 border-purple-500';
      case 'legendary':
        return 'text-yellow-500 border-yellow-500';
      default:
        return 'text-gray-500 border-gray-500';
    }
  };

  const getRarityIcon = (rarity: string) => {
    switch (rarity) {
      case 'rare':
        return <Star className="w-4 h-4" />;
      case 'epic':
        return <Award className="w-4 h-4" />;
      case 'legendary':
        return <Crown className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Магазин Кейсов</h2>
        <p className="text-muted-foreground">Попробуйте удачу и получите эксклюзивные награды!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {/* Willy Case */}
        <div className="bg-gradient-to-br from-yellow-500/20 to-orange-600/20 border-2 border-yellow-500/50 rounded-xl p-6 text-center">
          <div className="flex justify-center mb-4">
            <Package className="w-16 h-16 text-yellow-500" />
          </div>
          
          <h3 className="text-xl font-bold mb-2">Вилли Кейс</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Содержит редкие скины, улучшения и монеты
          </p>
          
          <div className="mb-4 text-sm space-y-1">
            <div className="flex justify-between">
              <span>Монеты (25,000)</span>
              <span className="text-gray-500">50%</span>
            </div>
            <div className="flex justify-between">
              <span>Улучшение (+5 клик)</span>
              <span className="text-blue-500">10%</span>
            </div>
            <div className="flex justify-between">
              <span>Редкие скины</span>
              <span className="text-blue-500">25%</span>
            </div>
            <div className="flex justify-between">
              <span>Эпические скины</span>
              <span className="text-purple-500">10%</span>
            </div>
            <div className="flex justify-between">
              <span>Легендарный скин</span>
              <span className="text-yellow-500">5%</span>
            </div>
          </div>
          
          <div className="text-lg font-bold mb-4">125,000 монет</div>
          
          <Button 
            onClick={() => openCase('willy')}
            disabled={coins < 125000 || isOpeningCase}
            className="w-full"
          >
            {isOpeningCase ? "Открываем..." : "Открыть кейс"}
          </Button>
        </div>

        {/* Tigra Case */}
        <div className="bg-gradient-to-br from-orange-500/20 to-red-600/20 border-2 border-orange-500/50 rounded-xl p-6 text-center">
          <div className="flex justify-center mb-4">
            <Zap className="w-16 h-16 text-orange-500" />
          </div>
          
          <h3 className="text-xl font-bold mb-2">Tigra Кейс</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Премиум кейс с уникальными скинами
          </p>
          
          <div className="mb-4 text-sm space-y-1">
            <div className="flex justify-between">
              <span>Монеты (50,000)</span>
              <span className="text-gray-500">50%</span>
            </div>
            <div className="flex justify-between">
              <span>Улучшение (+5 клик)</span>
              <span className="text-blue-500">10%</span>
            </div>
            <div className="flex justify-between">
              <span>Редкие скины</span>
              <span className="text-blue-500">25%</span>
            </div>
            <div className="flex justify-between">
              <span>Эпические скины</span>
              <span className="text-purple-500">12%</span>
            </div>
            <div className="flex justify-between">
              <span>Легендарные скины</span>
              <span className="text-yellow-500">3%</span>
            </div>
          </div>
          
          <div className="text-lg font-bold mb-4">200,000 монет</div>
          
          <Button 
            onClick={() => openCase('tigra')}
            disabled={coins < 200000 || isOpeningCase}
            className="w-full"
          >
            {isOpeningCase ? "Открываем..." : "Открыть кейс"}
          </Button>
        </div>
      </div>

      <Dialog open={lastReward !== null} onOpenChange={() => setLastReward(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">Поздравляем!</DialogTitle>
          </DialogHeader>
          
          {lastReward && (
            <div className="text-center space-y-4">
              <div className={cn("border-2 rounded-lg p-4", getRarityColor(lastReward.rarity))}>
                {lastReward.imagePath && (
                  <div className="flex justify-center mb-3">
                    <img 
                      src={lastReward.imagePath.startsWith("/lovable-uploads/") ? ${import.meta.env.BASE_URL}${lastReward.imagePath.slice(1)} : lastReward.imagePath} 
                      alt={lastReward.name}
                      className="w-24 h-24 object-contain"
                    />
                  </div>
                )}
                
                <div className="flex items-center justify-center gap-2 mb-2">
                  {getRarityIcon(lastReward.rarity)}
                  <h3 className="text-lg font-bold">{lastReward.name}</h3>
                </div>
                
                <p className={cn("text-sm font-medium", getRarityColor(lastReward.rarity))}>
                  {lastReward.rarity === 'common' && 'Обычный'}
                  {lastReward.rarity === 'rare' && 'Редкий'}
                  {lastReward.rarity === 'epic' && 'Эпический'}
                  {lastReward.rarity === 'legendary' && 'Легендарный'}
                </p>
              </div>
              
              <Button onClick={() => setLastReward(null)} className="w-full">
                Отлично!
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CaseShop;
