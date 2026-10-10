import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { ShoppingCart, Crown, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SkinItemProps {
  id: number;
  name: string;
  cost: number;
  owned: boolean;
  selected: boolean;
  affordable: boolean;
  imagePath: string;
  isLimited?: boolean;
  isSecret?: boolean;
  limitedRemaining?: number;
  limitedTotal?: number;
  onClick: () => void;
  onSelect: () => void;
}

const SkinItem: React.FC<SkinItemProps> = ({
  name,
  cost,
  owned,
  selected,
  affordable,
  imagePath,
  isLimited,
  isSecret,
  limitedRemaining,
  limitedTotal,
  onClick,
  onSelect,
}) => {
  return (
    <div 
      className={cn(
        "skin-item relative p-4 rounded-xl transition-all duration-200",
        selected ? "border-2 border-primary shadow-lg" : "border border-border",
        owned ? "bg-primary/5" : 
        affordable ? "bg-white/40 hover:bg-white/60" : "opacity-70 bg-white/20"
      )}
    >
      {isLimited && (
        <div className="absolute -top-2 -right-2 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
          <Crown size={12} />
          <span>Лимит: {limitedRemaining}/{limitedTotal}</span>
        </div>
      )}
      
      {isSecret && (
        <div className="absolute -top-2 -right-2 bg-purple-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
          <Award size={12} />
          <span>Секретный</span>
        </div>
      )}
      
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-semibold text-lg">{name}</h3>
        {owned && (
          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-primary/20 text-primary">
            Куплено
          </span>
        )}
      </div>
      
      <div className="h-28 mb-4 flex items-center justify-center rounded bg-muted/40 overflow-hidden">
        {imagePath ? (
          <img src={imagePath.startsWith("/lovable-uploads/") ? ${import.meta.env.BASE_URL}${imagePath.slice(1)} : imagePath} alt={name} className="h-full object-contain" />
        ) : (
          <span className="text-sm text-muted-foreground">Превью недоступно</span>
        )}
      </div>
      
      <div className="flex justify-between items-center">
        {!owned ? (
          <>
            <div className={cn("flex items-center", affordable ? "text-foreground" : "text-muted-foreground")}>
              <ShoppingCart size={16} className={affordable ? "text-yellow-500" : "text-muted-foreground"} />
              <span className="ml-1 text-sm font-medium">{cost.toLocaleString()}</span>
            </div>
            <Button 
              size="sm" 
              variant={affordable ? "default" : "outline"} 
              disabled={!affordable}
              onClick={onClick}
              className="text-xs px-3 py-1 h-auto min-w-16"
            >
              Купить
            </Button>
          </>
        ) : (
          <>
            <span className="text-sm text-muted-foreground">В коллекции</span>
            <Button 
              size="sm" 
              variant={selected ? "default" : "outline"} 
              onClick={onSelect}
              className="text-xs px-3 py-1 h-auto min-w-16"
            >
              {selected ? "Выбрано" : "Выбрать"}
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

// Define a proper type for skin objects
interface SkinType {
  id: number;
  name: string;
  cost: number;
  imagePath: string;
  isLimited?: boolean;
  isSecret?: boolean;
  limitedTotal?: number;
}

interface SkinShopProps {
  coins: number;
  onPurchase: (id: number, cost: number) => void;
  onSelect: (id: number) => void;
  selectedSkinId: number;
  ownedSkins: number[];
}

const SkinShop: React.FC<SkinShopProps> = ({ 
  coins, 
  onPurchase, 
  onSelect, 
  selectedSkinId, 
  ownedSkins
}) => {
  const [limitedSkinsRemaining, setLimitedSkinsRemaining] = useState<{[key: number]: number}>({});
  
  const [skins] = React.useState<SkinType[]>([
    { 
      id: 1, 
      name: "Обычный Вилли", 
      cost: 0, 
      imagePath: "/lovable-uploads/68eddb32-8d0d-4a0b-a8b5-d716d3d6850a.png" 
    },
    { 
      id: 2, 
      name: "Сонный Вилли", 
      cost: 1000, 
      imagePath: "/lovable-uploads/bc7df56a-ee75-4568-874a-202cf62a7000.png" 
    },
    { 
      id: 3, 
      name: "Собака Вилли", 
      cost: 2500, 
      imagePath: "/lovable-uploads/8245fbc5-57f4-4ad2-ad2b-0943c47fba04.png" 
    },
    { 
      id: 4, 
      name: "Вилли В Очках", 
      cost: 5000, 
      imagePath: "/lovable-uploads/6509b874-2e9c-499a-856f-a9c31e1ae7d5.png" 
    },
    { 
      id: 9, 
      name: "Вилли Вор", 
      cost: 10000, 
      imagePath: "/lovable-uploads/470405cf-8e2c-4cb5-b8cb-75f4171799cb.png" 
    },
    { 
      id: 10, 
      name: "Ковбой Вилли", 
      cost: 7500, 
      imagePath: "/lovable-uploads/fa0be052-b9ac-45d0-bc4d-644963752dd2.png" 
    },
    { 
      id: 12, 
      name: "Школьник Вилли", 
      cost: 8500, 
      imagePath: "/lovable-uploads/cd91618c-d6ae-49a8-8aee-db1b9d6bcf79.png" 
    },
    { 
      id: 13, 
      name: "Дедушка Вилли", 
      cost: 10000, 
      imagePath: "/lovable-uploads/97fa1580-791a-47ec-baae-f1b04d0adc90.png" 
    },
    { 
      id: 21, 
      name: "Кролик Вилли", 
      cost: 80000, 
      imagePath: "/lovable-uploads/28d56a06-8b61-4d5f-9ab0-86cbf600cb4a.png" 
    },
    { 
      id: 5, 
      name: "Супер Вилли", 
      cost: 100000, 
      imagePath: "/lovable-uploads/2d550ec7-3cfc-409f-beaa-f3dde80e78a8.png" 
    },
    { 
      id: 14, 
      name: "Детектив Вилли", 
      cost: 1000000, 
      imagePath: "/lovable-uploads/d7f3bb46-8115-40f4-ab33-f0777c2c5c69.png" 
    },
    { 
      id: 6, 
      name: "Няшка Вилли", 
      cost: 1000000, 
      imagePath: "/lovable-uploads/c7311408-e251-475f-b409-3e8caedf7d00.png" 
    },
    { 
      id: 20, 
      name: "Шьюха Вилли", 
      cost: 50000000, 
      imagePath: "/lovable-uploads/e5312b8e-070b-4b81-8c11-b77d02a2b077.png" 
    },
    { 
      id: 22, 
      name: "Маньяк Вилли", 
      cost: 1000000000, 
      imagePath: "/lovable-uploads/d0379cee-266c-4d62-9d40-53572c041dff.png" 
    },
    // Secret skins (promo code exclusive)
    { 
      id: 8, 
      name: "Кинито Вилли", 
      cost: 0, 
      imagePath: "/lovable-uploads/843a7795-7de4-4b7e-808b-30e7240830df.png",
      isSecret: true,
    },
    { 
      id: 11, 
      name: "Вилли Вонка", 
      cost: 0, 
      imagePath: "/lovable-uploads/f0bd6a32-5ec7-45cc-8245-500a83f3a205.png",
      isSecret: true,
    },
    { 
      id: 15, 
      name: "Белый Вилли", 
      cost: 0, 
      imagePath: "/lovable-uploads/3a6ec9bf-07a9-4915-a914-747057114163.png",
      isSecret: true,
    },
    { 
      id: 16, 
      name: "Шериф Вилли", 
      cost: 0, 
      imagePath: "/lovable-uploads/82818560-f292-4545-8eda-9e0ee3ec1ef5.png",
      isSecret: true,
    },
    { 
      id: 17, 
      name: "Вилли Неон", 
      cost: 0, 
      imagePath: "/lovable-uploads/42a193d8-65dd-4558-a637-c572d1f2730f.png",
      isSecret: true,
    },
    { 
      id: 18, 
      name: "Дилдо Носок", 
      cost: 0, 
      imagePath: "/lovable-uploads/2cee5513-e0c8-4f80-8e4e-e96200873e85.png",
      isSecret: true,
    },
    { 
      id: 19, 
      name: "Доня", 
      cost: 0, 
      imagePath: "/lovable-uploads/8db83a43-83a7-4705-8f83-9346b999d612.png",
      isSecret: true,
    },
    { 
      id: 23, 
      name: "Мявка", 
      cost: 0, 
      imagePath: "/lovable-uploads/d123daca-876c-4896-8523-087df4d3b0ec.png",
      isSecret: true,
    },
    // Case skins (case exclusive)
    { 
      id: 24, 
      name: "Какашка Вилли", 
      cost: 0, 
      imagePath: "/lovable-uploads/1f17a9f9-6010-4c7f-bf25-813e600f4e6e.png",
      isSecret: true,
    },
    { 
      id: 25, 
      name: "Хлебушек Вилли", 
      cost: 0, 
      imagePath: "/lovable-uploads/7873fefb-0b9b-4294-a71a-9e9fdb215334.png",
      isSecret: true,
    },
    { 
      id: 26, 
      name: "Клубника Вилли", 
      cost: 0, 
      imagePath: "/lovable-uploads/28390614-5871-43aa-ba68-d69f1b0b1a68.png",
      isSecret: true,
    },
    { 
      id: 27, 
      name: "Чернильный Вилли", 
      cost: 0, 
      imagePath: "/lovable-uploads/aac2b114-f2a0-4682-aa2d-b6a586dc17b9.png",
      isSecret: true,
    },
    { 
      id: 28, 
      name: "Страшилка Вилли", 
      cost: 0, 
      imagePath: "/lovable-uploads/87e4031b-7db7-41fb-b3d5-2cb74207ab98.png",
      isSecret: true,
    },
    { 
      id: 29, 
      name: "Томас Вилли", 
      cost: 0, 
      imagePath: "/lovable-uploads/bbbb7ef3-be7b-43d2-8485-49151bb80279.png",
      isSecret: true,
    },
    { 
      id: 30, 
      name: "Уолтер Вилли", 
      cost: 0, 
      imagePath: "/lovable-uploads/768b884a-8b5f-4ac1-81f4-6362128f8e16.png",
      isSecret: true,
    },
    { 
      id: 31, 
      name: "Миаморе Вилли", 
      cost: 0, 
      imagePath: "/lovable-uploads/150b5ffb-6243-45ee-92bb-b6d76ad897b3.png",
      isSecret: true,
    },
    // New Tigra case skins
    { 
      id: 32, 
      name: "Пожилой Вилли", 
      cost: 0, 
      imagePath: "/lovable-uploads/d2d1f6ba-441f-490a-8ccf-cc4eb80ff9a2.png",
      isSecret: true,
    },
    { 
      id: 33, 
      name: "Деловой Вилли", 
      cost: 0, 
      imagePath: "/lovable-uploads/a8798ca4-b0ca-4e51-b57b-8e0aa772662c.png",
      isSecret: true,
    },
    { 
      id: 34, 
      name: "Пляжный Вилли", 
      cost: 0, 
      imagePath: "/lovable-uploads/158a54f5-0f5a-4936-903f-d11a9184da87.png",
      isSecret: true,
    },
    { 
      id: 35, 
      name: "Повар Вилли", 
      cost: 0, 
      imagePath: "/lovable-uploads/26688a77-284a-469c-95e7-a4f175089e66.png",
      isSecret: true,
    },
    { 
      id: 36, 
      name: "Спортсмен Вилли", 
      cost: 0, 
      imagePath: "/lovable-uploads/c78f06c2-e05e-4078-8ac5-7c322d1fc3b6.png",
      isSecret: true,
    },
    { 
      id: 37, 
      name: "Японка Вилли", 
      cost: 0, 
      imagePath: "/lovable-uploads/8b467f2f-9059-4d2c-b660-d2c963258453.png",
      isSecret: true,
    },
    { 
      id: 38, 
      name: "Король Вилли", 
      cost: 0, 
      imagePath: "/lovable-uploads/70fe6fae-7880-4a7e-9c80-f30f102bfe2f.png",
      isSecret: true,
    },
    { 
      id: 40, 
      name: "Хаги Вилли", 
      cost: 0, 
      imagePath: "/lovable-uploads/94c34969-72b0-4360-83ea-9cfedd83f163.png",
      isSecret: true,
    },
    { 
      id: 41, 
      name: "Стример", 
      cost: 0, 
      imagePath: "/lovable-uploads/streamer-willy.png",
      isSecret: true,
    },
    { 
      id: 42, 
      name: "Злейд", 
      cost: 0, 
      imagePath: "/lovable-uploads/zleyd-willy.png",
      isSecret: true,
    },
    { 
      id: 43, 
      name: "Ви", 
      cost: 0, 
      imagePath: "/lovable-uploads/vi-character.png",
      isSecret: true,
    }
  ]);
  
  useEffect(() => {
    const savedData = localStorage.getItem('catClickerSave');
    if (savedData) {
      try {
        const data = JSON.parse(savedData);
        if (data.limitedSkinsRemaining) {
          setLimitedSkinsRemaining(data.limitedSkinsRemaining);
        }
      } catch (error) {
        console.error('Error loading limited skins data', error);
      }
    }
  }, []);
  
  useEffect(() => {
    const savedData = localStorage.getItem('catClickerSave');
    if (savedData) {
      try {
        const data = JSON.parse(savedData);
        const updatedData = {
          ...data,
          limitedSkinsRemaining
        };
        localStorage.setItem('catClickerSave', JSON.stringify(updatedData));
      } catch (error) {
        console.error('Error updating limited skins data', error);
      }
    }
  }, [limitedSkinsRemaining]);
  
  const handlePurchase = (id: number) => {
    const skin = skins.find(skin => skin.id === id);
    if (!skin) return;
    
    if (skin.isLimited) {
      if (limitedSkinsRemaining[id] <= 0) {
        return;
      }
      
      setLimitedSkinsRemaining(prev => ({
        ...prev,
        [id]: Math.max(0, (prev[id] || 0) - 1)
      }));
    }
    
    onPurchase(id, skin.cost);
  };

  const shouldDisplaySkin = (skin: SkinType) => {
    // Hide owned skins from the shop
    if (ownedSkins.includes(skin.id)) {
      return false;
    }
    
    // Show only purchasable skins (not secret or limited with 0 remaining)
    if (!skin.isLimited && !skin.isSecret) {
      return true;
    }
    
    if (skin.isLimited) {
      const remaining = limitedSkinsRemaining[skin.id] || 0;
      return remaining > 0;
    }
    
    return false;
  };

  const availableSkins = skins.filter(shouldDisplaySkin);

  return (
    <div className="w-full">
      {availableSkins.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-2xl font-bold mb-4 text-primary">🎉</div>
          <h3 className="text-xl font-semibold mb-2">Ты скупил все скины! :)</h3>
          <p className="text-muted-foreground">Скоро выйдут новые скины</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
          {availableSkins.map((skin) => (
            <SkinItem
              key={skin.id}
              id={skin.id}
              name={skin.name}
              cost={skin.cost}
              owned={ownedSkins.includes(skin.id)}
              selected={selectedSkinId === skin.id}
              affordable={coins >= skin.cost}
              imagePath={skin.imagePath}
              isSecret={skin.isSecret}
              isLimited={skin.isLimited}
              limitedRemaining={skin.isLimited ? limitedSkinsRemaining[skin.id] || 0 : undefined}
              limitedTotal={skin.limitedTotal}
              onClick={() => handlePurchase(skin.id)}
              onSelect={() => onSelect(skin.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SkinShop;
