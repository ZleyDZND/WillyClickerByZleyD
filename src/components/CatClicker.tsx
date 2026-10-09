import React, { useState } from "react";
import { useCatClicker } from "@/hooks/useCatClicker";
import CatImage from "./cat-clicker/CatImage";
import BonusTimer from "./cat-clicker/BonusTimer";
import StatsDisplay from "./cat-clicker/StatsDisplay";
import AutoClickerWarning from "./cat-clicker/AutoClickerWarning";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { format } from "@/lib/utils";
import SkinShop from "./SkinShop";
import PromoCodeInput from "./PromoCodeInput";
import TabMenu from "./TabMenu";
import CaseShop from "./CaseShop";
import { useToast } from "@/hooks/use-toast";
import { useGameStore } from "@/stores/use-game-store";

// List of promo codes that give 3 million coins
const PROMO_CODES_3M = [
  "WILLICAT2025", "MEOWGAME", "CATPLAYS", "WILLIJUMPSCARE", "SCARYPAWS",
  "FELINEMASTER", "KITTENSTREAM", "CLAWHORROR", "SPOOKYMEOW", "WILLIHALLOW",
  "STRAYBOOST", "KITTENCITY", "MECHAPAWS", "NEKOFUTURE", "ROBOCATX2",
  "JUMPPURR", "STEALTHFELINE", "CATPARKOUR", "NEKOHACK", "FURRYTECH",
  "SCREAMINGCAT", "WILLIHIDE", "CLAWESCAPE", "MONSTERPAW", "SHADOWMEOW",
  "DARKWHISKERS", "NIGHTPAWS", "SCAREDYNYA", "FELINEFEAR", "MEOWTERROR",
  "SCPKITTY", "SCPPAWS", "049MEOW", "REDPAW173", "CLASS-D-NEKO",
  "CONTAINEDCAT", "SCRATCHSCP", "FACEMEOW", "CREEPYKITTY", "CLAWFACILITY",
  "WILLIHAHA", "LMAOCAT", "KITTENFAIL", "MEOWLMAO", "CLAWEDAGAIN",
  "FURRYPARODY", "NYANSKETCH", "SPOOKYMEME", "KITTYTROLL", "TROLLOPAWS",
  "LIVEMEOW", "CHATOFFPAWS", "WILLICALL", "SUPAWCHAT", "DONNYA",
  "CHATFELINE", "FELINEREACT", "NEKODONATE", "MEOWLIKE", "CLAWSUB",
  "SPEEDRUNPAW", "NYANHARDMODE", "ULTIMATEKITTY", "STRATEGYNEKO", "FIRSTTRYMEOW",
  "GGWPPAWS", "KITTENWIN", "CLUTCHMEOW", "JUMPSCAREX2", "HORRORPRO",
  "WILLIARMY", "NEKOGANG", "CLAWFAMILY", "PAWSOMEFANS", "MEOWFANDOM",
  "SCRATCHERSQUAD", "FELINEFOLLOW", "KITTENSUPPORT", "WILLIHYPE", "PURRFANS",
  "SPOOKYFURRY", "RAGEKITTY", "FURBALLRAGE", "QUITNYA", "SECRETWILLI",
  "MEOWBOOST", "CLAWENGAGE", "WILLIHIDDEN", "PURRGRIND", "NEKOHACKMODE",
  "404PAWS", "WHISPERNYA", "DARKKITTY", "CATBEYOND", "GLITCHMEOW",
  "BLOODYPAWS", "ERRORNEKO", "LOSTFELINE", "NOESCAPEWILLI", "THELASTMEOW"
];

const CatClicker = () => {
  const {
    isClicking,
    showGoldEffect,
    bonusActive,
    bonusTimer,
    bonusMultiplier,
    bonusThreshold,
    coins,
    coinsPerClick,
    passiveIncome,
    selectedSkin,
    handleCatClick,
    addCoins,
    autoClickerDetected,
    cooldownSeconds
  } = useCatClicker();

  const [activeTab, setActiveTab] = useState("game");
  const [showPromoInput, setShowPromoInput] = useState(false);
  const [showMySkinsDialog, setShowMySkinsDialog] = useState(false);
  const [showTwitchAlert, setShowTwitchAlert] = useState(false);
  const { toast } = useToast();
  const { ownedSkins } = useGameStore();

  // Track used promo codes
  const [usedPromoCodes, setUsedPromoCodes] = useState<string[]>(() => {
    const savedData = localStorage.getItem('catClickerSave');
    if (savedData) {
      try {
        const data = JSON.parse(savedData);
        return data.usedPromoCodes || [];
      } catch (error) {
        console.error('Error loading used promo codes', error);
        return [];
      }
    }
    return [];
  });

  const handlePromoCodeSubmit = (code: string) => {
    // Check if code has already been used
    if (usedPromoCodes.includes(code.toUpperCase())) {
      toast({
        title: "Промокод уже использован",
        description: "Вы уже активировали этот промокод",
        variant: "destructive"
      });
      return;
    }
    
    // Process the promocode
    let codeValid = false;
    
    // Check for infinite coins promo code
    if (code.toUpperCase() === "01ZLEYD2355") {
      // Set coins to a very large number (999 trillion)
      const infiniteCoins = 999999999999999;
      useGameStore.getState().addCoins(infiniteCoins - coins);
      toast({
        title: "Промокод активирован!",
        description: "Вы получили бесконечные монеты!",
        variant: "default"
      });
      codeValid = true;
    }
    // Check if code is in the 3M coins list
    else if (PROMO_CODES_3M.includes(code.toUpperCase())) {
      addCoins(3000000);
      toast({
        title: "Промокод активирован!",
        description: "Вы получили 3,000,000 монет!",
        variant: "default"
      });
      codeValid = true;
    } else {
      // Define other promo code rewards
      switch (code.toUpperCase()) {
        case "BONUS100":
          addCoins(100);
          toast({
            title: "Промокод активирован!",
            description: "Вы получили 100 монет!",
            variant: "default"
          });
          codeValid = true;
          break;
        case "SUPER500":
          addCoins(500);
          toast({
            title: "Промокод активирован!",
            description: "Вы получили 500 монет!",
            variant: "default"
          });
          codeValid = true;
          break;
        case "WILLY1000":
          addCoins(1000);
          toast({
            title: "Промокод активирован!",
            description: "Вы получили 1000 монет!",
            variant: "default"
          });
          codeValid = true;
          break;
        case "CAT5000":
          addCoins(5000);
          toast({
            title: "Промокод активирован!",
            description: "Вы получили 5000 монет!",
            variant: "default"
          });
          codeValid = true;
          break;
        case "SECRET11":
          if (!ownedSkins.includes(11)) {
            useGameStore.getState().addOwnedSkin(11);
            toast({
              title: "Секретный скин получен!",
              description: "Вы получили скин 'Вилли Вонка'!",
              variant: "default"
            });
          } else {
            toast({
              title: "У вас уже есть этот скин",
              description: "Вместо скина вы получаете 1000 монет!",
              variant: "default"
            });
            addCoins(1000);
          }
          codeValid = true;
          break;
        case "MEOWKA":
          if (!ownedSkins.includes(23)) {
            useGameStore.getState().addOwnedSkin(23);
            toast({
              title: "Секретный скин получен!",
              description: "Вы получили скин 'Мявка'!",
              variant: "default"
            });
          } else {
            toast({
              title: "У вас уже есть этот скин",
              description: "Вместо скина вы получаете 1000 монет!",
              variant: "default"
            });
            addCoins(1000);
          }
          codeValid = true;
          break;
        case "DONYA2024":
          if (!ownedSkins.includes(19)) {
            useGameStore.getState().addOwnedSkin(19);
            toast({
              title: "Секретный скин получен!",
              description: "Вы получили скин 'Доня'!",
              variant: "default"
            });
          } else {
            toast({
              title: "У вас уже есть этот скин",
              description: "Вместо скина вы получаете 1000 монет!",
              variant: "default"
            });
            addCoins(1000);
          }
          codeValid = true;
          break;
        case "STREAM":
          if (!ownedSkins.includes(41)) {
            useGameStore.getState().addOwnedSkin(41);
            toast({
              title: "Секретный скин получен!",
              description: "Вы получили скин 'Стример'!",
              variant: "default"
            });
          } else {
            toast({
              title: "У вас уже есть этот скин",
              description: "Вместо скина вы получаете 1000 монет!",
              variant: "default"
            });
            addCoins(1000);
          }
          codeValid = true;
          break;
        case "SPARK":
          addCoins(1000000);
          toast({
            title: "Промокод активирован!",
            description: "Вы получили 1,000,000 монет!",
            variant: "default"
          });
          codeValid = true;
          break;
        case "DILDOSOCK":
          if (!ownedSkins.includes(18)) {
            useGameStore.getState().addOwnedSkin(18);
            toast({
              title: "Секретный скин получен!",
              description: "Вы получили скин 'Дилдо Носок'!",
              variant: "default"
            });
          } else {
            toast({
              title: "У вас уже есть этот скин",
              description: "Вместо скина вы получаете 1000 монет!",
              variant: "default"
            });
            addCoins(1000);
          }
          codeValid = true;
          break;
        case "WHITEWILLY":
          if (!ownedSkins.includes(15)) {
            useGameStore.getState().addOwnedSkin(15);
            toast({
              title: "Секретный скин получен!",
              description: "Вы получили скин 'Белый Вилли'!",
              variant: "default"
            });
          } else {
            toast({
              title: "У вас уже есть этот скин",
              description: "Вместо скина вы получаете 1000 монет!",
              variant: "default"
            });
            addCoins(1000);
          }
          codeValid = true;
          break;
        case "SHERIFF925":
          if (!ownedSkins.includes(16)) {
            useGameStore.getState().addOwnedSkin(16);
            toast({
              title: "Секретный скин получен!",
              description: "Вы получили скин 'Шериф Вилли'!",
              variant: "default"
            });
          } else {
            toast({
              title: "У вас уже есть этот скин",
              description: "Вместо скина вы получаете 1000 монет!",
              variant: "default"
            });
            addCoins(1000);
          }
          codeValid = true;
          break;
        case "NEONCAT":
          if (!ownedSkins.includes(17)) {
            useGameStore.getState().addOwnedSkin(17);
            toast({
              title: "Секретный скин получен!",
              description: "Вы получили скин 'Вилли Неон'!",
              variant: "default"
            });
          } else {
            toast({
              title: "У вас уже есть этот скин",
              description: "Вместо скина вы получаете 1000 монет!",
              variant: "default"
            });
            addCoins(1000);
          }
          codeValid = true;
          break;
        case "HUGGY":
          if (!ownedSkins.includes(40)) {
            useGameStore.getState().addOwnedSkin(40);
            toast({
              title: "Секретный скин получен!",
              description: "Вы получили скин 'Хаги Вилли'!",
              variant: "default"
            });
          } else {
            toast({
              title: "У вас уже есть этот скин",
              description: "Вместо скина вы получаете 1000 монет!",
              variant: "default"
            });
            addCoins(1000);
          }
          codeValid = true;
          break;
        default:
          toast({
            title: "Неверный промокод",
            description: "Введенный промокод не существует",
            variant: "destructive"
          });
      }
    }
    
    // If code was valid, save it as used
    if (codeValid) {
      const newUsedCodes = [...usedPromoCodes, code.toUpperCase()];
      setUsedPromoCodes(newUsedCodes);
      
      // Save to localStorage
      const savedData = localStorage.getItem('catClickerSave');
      if (savedData) {
        try {
          const data = JSON.parse(savedData);
          localStorage.setItem('catClickerSave', JSON.stringify({
            ...data,
            usedPromoCodes: newUsedCodes
          }));
        } catch (error) {
          console.error('Error updating used promo codes', error);
        }
      }
    }
  };

  const handleSkinPurchase = (id: number, cost: number) => {
    if (coins >= cost) {
      addCoins(-cost);
      useGameStore.getState().addOwnedSkin(id);
      
      toast({
        title: "Скин приобретен!",
        description: "Новый скин добавлен в вашу коллекцию",
        variant: "default"
      });
    }
  };

  const handleSkinSelect = (id: number) => {
    useGameStore.getState().setSelectedSkin(id);
    
    // Check if this is the first time selecting Vi character (id 43)
    if (id === 43) {
      const twitchAlertShown = localStorage.getItem('viTwitchAlertShown');
      if (!twitchAlertShown) {
        setShowTwitchAlert(true);
        localStorage.setItem('viTwitchAlertShown', 'true');
      }
    }
    
    toast({
      title: "Скин выбран!",
      description: "Ваш кот сменил внешний вид",
      variant: "default"
    });
  };

  const handleUpgradePurchase = (id: string, cost: number) => {
    if (coins >= cost) {
      addCoins(-cost);
      
      // Update the stats based on the upgrade
      const gameStore = useGameStore.getState();
      
      if (id.startsWith("click_power_")) {
        // Handle click power upgrades
        if (id === "click_power_1") {
          gameStore.setCoinsPerClick(coinsPerClick + 1);
        } else if (id === "click_power_2") {
          gameStore.setCoinsPerClick(coinsPerClick + 5);
        } else if (id === "click_power_3") {
          gameStore.setCoinsPerClick(coinsPerClick + 10);
        }
      } else if (id.startsWith("passive_income_")) {
        // Handle passive income upgrades
        if (id === "passive_income_1") {
          gameStore.setPassiveIncome(passiveIncome + 1);
        } else if (id === "passive_income_2") {
          gameStore.setPassiveIncome(passiveIncome + 3);
        } else if (id === "passive_income_3") {
          gameStore.setPassiveIncome(passiveIncome + 7);
        }
      } else if (id.startsWith("click_multiplier_")) {
        // Handle click multiplier upgrades
        if (id === "click_multiplier_1") {
          gameStore.setCoinsPerClick(Math.floor(coinsPerClick * 1.5));
        } else if (id === "click_multiplier_2") {
          gameStore.setCoinsPerClick(coinsPerClick * 2);
        }
      } else if (id.startsWith("passive_multiplier_")) {
        // Handle passive multiplier upgrades
        if (id === "passive_multiplier_1") {
          gameStore.setPassiveIncome(Math.floor(passiveIncome * 1.5));
        } else if (id === "passive_multiplier_2") {
          gameStore.setPassiveIncome(passiveIncome * 2);
        }
      }
      
      toast({
        title: "Улучшение приобретено!",
        description: "Ваши способности усилены!",
        variant: "default"
      });
    }
  };

  const handleCaseOpen = (caseId: string, cost: number) => {
    if (coins >= cost) {
      addCoins(-cost);
      
      // Case opening logic will be handled in CaseShop component
      toast({
        title: "Кейс открыт!",
        description: "Посмотрите что вам выпало!",
        variant: "default"
      });
    }
  };

  // Skin data for the "My Skins" dialog
  const allSkinsData = [
    { id: 1, name: "Обычный Вилли", imagePath: "/lovable-uploads/68eddb32-8d0d-4a0b-a8b5-d716d3d6850a.png" },
    { id: 2, name: "Сонный Вилли", imagePath: "/lovable-uploads/bc7df56a-ee75-4568-874a-202cf62a7000.png" },
    { id: 3, name: "Собака Вилли", imagePath: "/lovable-uploads/8245fbc5-57f4-4ad2-ad2b-0943c47fba04.png" },
    { id: 4, name: "Вилли В Очках", imagePath: "/lovable-uploads/6509b874-2e9c-499a-856f-a9c31e1ae7d5.png" },
    { id: 5, name: "Супер Вилли", imagePath: "/lovable-uploads/2d550ec7-3cfc-409f-beaa-f3dde80e78a8.png" },
    { id: 6, name: "Няшка Вилли", imagePath: "/lovable-uploads/c7311408-e251-475f-b409-3e8caedf7d00.png" },
    { id: 7, name: "Стиви Вилли", imagePath: "/lovable-uploads/5d8df752-2d5c-4c22-afc1-e2c31ae5d036.png" },
    { id: 8, name: "Кинито Вилли", imagePath: "/lovable-uploads/843a7795-7de4-4b7e-808b-30e7240830df.png" },
    { id: 9, name: "Вилли Вор", imagePath: "/lovable-uploads/470405cf-8e2c-4cb5-b8cb-75f4171799cb.png" },
    { id: 10, name: "Ковбой Вилли", imagePath: "/lovable-uploads/fa0be052-b9ac-45d0-bc4d-644963752dd2.png" },
    { id: 11, name: "Вилли Вонка", imagePath: "/lovable-uploads/f0bd6a32-5ec7-45cc-8245-500a83f3a205.png" },
    { id: 12, name: "Школьник Вилли", imagePath: "/lovable-uploads/cd91618c-d6ae-49a8-8aee-db1b9d6bcf79.png" },
    { id: 13, name: "Дедушка Вилли", imagePath: "/lovable-uploads/97fa1580-791a-47ec-baae-f1b04d0adc90.png" },
    { id: 14, name: "Детектив Вилли", imagePath: "/lovable-uploads/d7f3bb46-8115-40f4-ab33-f0777c2c5c69.png" },
    { id: 15, name: "Белый Вилли", imagePath: "/lovable-uploads/3a6ec9bf-07a9-4915-a914-747057114163.png" },
    { id: 16, name: "Шериф Вилли", imagePath: "/lovable-uploads/82818560-f292-4545-8eda-9e0ee3ec1ef5.png" },
    { id: 17, name: "Вилли Неон", imagePath: "/lovable-uploads/42a193d8-65dd-4558-a637-c572d1f2730f.png" },
    { id: 18, name: "Дилдо Носок", imagePath: "/lovable-uploads/2cee5513-e0c8-4f80-8e4e-e96200873e85.png" },
    { id: 19, name: "Доня", imagePath: "/lovable-uploads/8db83a43-83a7-4705-8f83-9346b999d612.png" },
    { id: 20, name: "Шьюха Вилли", imagePath: "/lovable-uploads/e5312b8e-070b-4b81-8c11-b77d02a2b077.png" },
    { id: 21, name: "Кролик Вилли", imagePath: "/lovable-uploads/28d56a06-8b61-4d5f-9ab0-86cbf600cb4a.png" },
    { id: 22, name: "Маньяк Вилли", imagePath: "/lovable-uploads/d0379cee-266c-4d62-9d40-53572c041dff.png" },
    { id: 23, name: "Мявка", imagePath: "/lovable-uploads/d123daca-876c-4896-8523-087df4d3b0ec.png" },
    { id: 24, name: "Какашка Вилли", imagePath: "/lovable-uploads/1f17a9f9-6010-4c7f-bf25-813e600f4e6e.png" },
    { id: 25, name: "Хлебушек Вилли", imagePath: "/lovable-uploads/7873fefb-0b9b-4294-a71a-9e9fdb215334.png" },
    { id: 26, name: "Клубника Вилли", imagePath: "/lovable-uploads/28390614-5871-43aa-ba68-d69f1b0b1a68.png" },
    { id: 27, name: "Чернильный Вилли", imagePath: "/lovable-uploads/aac2b114-f2a0-4682-aa2d-b6a586dc17b9.png" },
    { id: 28, name: "Страшилка Вилли", imagePath: "/lovable-uploads/87e4031b-7db7-41fb-b3d5-2cb74207ab98.png" },
    { id: 29, name: "Томас Вилли", imagePath: "/lovable-uploads/bbbb7ef3-be7b-43d2-8485-49151bb80279.png" },
    { id: 30, name: "Уолтер Вилли", imagePath: "/lovable-uploads/768b884a-8b5f-4ac1-81f4-6362128f8e16.png" },
    { id: 31, name: "Миаморе Вилли", imagePath: "/lovable-uploads/150b5ffb-6243-45ee-92bb-b6d76ad897b3.png" },
    // New Tigra case skins
    { id: 32, name: "Пожилой Вилли", imagePath: "/lovable-uploads/d2d1f6ba-441f-490a-8ccf-cc4eb80ff9a2.png" },
    { id: 33, name: "Деловой Вилли", imagePath: "/lovable-uploads/a8798ca4-b0ca-4e51-b57b-8e0aa772662c.png" },
    { id: 34, name: "Пляжный Вилли", imagePath: "/lovable-uploads/158a54f5-0f5a-4936-903f-d11a9184da87.png" },
    { id: 35, name: "Повар Вилли", imagePath: "/lovable-uploads/26688a77-284a-469c-95e7-a4f175089e66.png" },
    { id: 36, name: "Спортсмен Вилли", imagePath: "/lovable-uploads/c78f06c2-e05e-4078-8ac5-7c322d1fc3b6.png" },
    { id: 37, name: "Японка Вилли", imagePath: "/lovable-uploads/8b467f2f-9059-4d2c-b660-d2c963258453.png" },
    { id: 38, name: "Король Вилли", imagePath: "/lovable-uploads/70fe6fae-7880-4a7e-9c80-f30f102bfe2f.png" },
    { id: 39, name: "Вилли Улыбается тебе", imagePath: "/lovable-uploads/d70cda16-a51e-44d8-bd91-e824b64f161c.png" },
    { id: 40, name: "Хаги Вилли", imagePath: "/lovable-uploads/94c34969-72b0-4360-83ea-9cfedd83f163.png" },
    { id: 41, name: "Стример", imagePath: "/lovable-uploads/streamer-willy.png" },
    { id: 42, name: "Злейд", imagePath: "/lovable-uploads/zleyd-willy.png" },
    { id: 43, name: "Ви", imagePath: "/lovable-uploads/vi-character.png" }
  ];

  return (
    <div className="cat-clicker-container mx-auto mb-6">
      <Tabs 
        value={activeTab} 
        onValueChange={setActiveTab} 
        className="w-full mb-4"
      >
        <TabsList className="grid grid-cols-5 mb-4">
          <TabsTrigger value="game">Игра</TabsTrigger>
          <TabsTrigger value="upgrades">Улучшения</TabsTrigger>
          <TabsTrigger value="skins">Скины</TabsTrigger>
          <TabsTrigger value="cases">Кейсы</TabsTrigger>
          <TabsTrigger value="promo">Промокод</TabsTrigger>
        </TabsList>
        
        <TabsContent value="game" className="space-y-4">
          <div className="glass-panel p-4 rounded-lg relative">
            <AutoClickerWarning 
              active={autoClickerDetected} 
              cooldownSeconds={cooldownSeconds} 
            />
            
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <div className="text-sm text-muted-foreground">
                  Монеты: <span className="font-medium text-foreground">{format(coins)}</span>
                </div>
                <Dialog open={showMySkinsDialog} onOpenChange={setShowMySkinsDialog}>
                  <DialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="text-xs h-6 px-2"
                    >
                      Мои скины
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Мои скины</DialogTitle>
                    </DialogHeader>
                    <Tabs defaultValue="willy" className="w-full">
                      <TabsList className="grid w-full grid-cols-3 mb-4">
                        <TabsTrigger value="willy">Вилли</TabsTrigger>
                        <TabsTrigger value="zleyd">Злейд</TabsTrigger>
                        <TabsTrigger value="vi">Ви</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="willy">
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                          {allSkinsData
                            .filter(skin => ownedSkins.includes(skin.id) && skin.id !== 42 && skin.id !== 43)
                            .map(skin => (
                              <div 
                                key={skin.id}
                                className={`p-3 rounded-lg border cursor-pointer transition-all ${
                                  selectedSkin === skin.id 
                                    ? 'border-primary bg-primary/10' 
                                    : 'border-border hover:border-primary/50'
                                }`}
                                onClick={() => {
                                  handleSkinSelect(skin.id);
                                  setShowMySkinsDialog(false);
                                }}
                              >
                                <div className="aspect-square mb-2 rounded overflow-hidden bg-muted/40">
                                  <img 
                                    src={skin.imagePath} 
                                    alt={skin.name}
                                    className="w-full h-full object-contain"
                                  />
                                </div>
                                <p className="text-xs font-medium text-center truncate">
                                  {skin.name}
                                </p>
                                {selectedSkin === skin.id && (
                                  <p className="text-xs text-primary text-center mt-1">
                                    Выбрано
                                  </p>
                                )}
                              </div>
                            ))}
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="zleyd">
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                          {allSkinsData
                            .filter(skin => ownedSkins.includes(skin.id) && skin.id === 42)
                            .map(skin => (
                              <div 
                                key={skin.id}
                                className={`p-3 rounded-lg border cursor-pointer transition-all ${
                                  selectedSkin === skin.id 
                                    ? 'border-primary bg-primary/10' 
                                    : 'border-border hover:border-primary/50'
                                }`}
                                onClick={() => {
                                  handleSkinSelect(skin.id);
                                  setShowMySkinsDialog(false);
                                }}
                              >
                                <div className="aspect-square mb-2 rounded overflow-hidden bg-muted/40">
                                  <img 
                                    src={skin.imagePath} 
                                    alt={skin.name}
                                    className="w-full h-full object-contain"
                                  />
                                </div>
                                <p className="text-xs font-medium text-center truncate">
                                  {skin.name}
                                </p>
                                {selectedSkin === skin.id && (
                                  <p className="text-xs text-primary text-center mt-1">
                                    Выбрано
                                  </p>
                                )}
                              </div>
                            ))}
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="vi">
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                          {allSkinsData
                            .filter(skin => ownedSkins.includes(skin.id) && skin.id === 43)
                            .map(skin => (
                              <div 
                                key={skin.id}
                                className={`p-3 rounded-lg border cursor-pointer transition-all ${
                                  selectedSkin === skin.id 
                                    ? 'border-primary bg-primary/10' 
                                    : 'border-border hover:border-primary/50'
                                }`}
                                onClick={() => {
                                  handleSkinSelect(skin.id);
                                  setShowMySkinsDialog(false);
                                }}
                              >
                                <div className="aspect-square mb-2 rounded overflow-hidden bg-muted/40">
                                  <img 
                                    src={skin.imagePath} 
                                    alt={skin.name}
                                    className="w-full h-full object-contain"
                                  />
                                </div>
                                <p className="text-xs font-medium text-center truncate">
                                  {skin.name}
                                </p>
                                {selectedSkin === skin.id && (
                                  <p className="text-xs text-primary text-center mt-1">
                                    Выбрано
                                  </p>
                                )}
                              </div>
                            ))}
                        </div>
                      </TabsContent>
                    </Tabs>
                  </DialogContent>
                </Dialog>
                <Button
                  onClick={() => window.open("https://preview--willys-cat-newsfeed.lovable.app/#", "_blank")}
                  variant="outline"
                  size="sm"
                  className="text-xs h-6 px-2 bg-red-600 hover:bg-red-700 text-white border-red-600"
                >
                  Новости
                </Button>
              </div>
              <BonusTimer 
                bonusActive={bonusActive}
                bonusTimer={bonusTimer}
                bonusMultiplier={bonusMultiplier}
              />
            </div>
            
            <CatImage 
              selectedSkin={selectedSkin}
              isClicking={isClicking}
              showGoldEffect={showGoldEffect}
              bonusThreshold={bonusThreshold}
              onClick={handleCatClick}
            />
            
            <StatsDisplay 
              coins={coins}
              coinsPerClick={coinsPerClick}
              passiveIncome={passiveIncome}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="upgrades" className="space-y-4">
          <div className="glass-panel p-4 rounded-lg">
            <TabMenu 
              coins={coins}
              coinsPerClick={coinsPerClick}
              passiveIncome={passiveIncome}
              onPurchase={handleSkinPurchase}
              onSelect={handleSkinSelect}
              selectedSkinId={selectedSkin}
              ownedSkins={ownedSkins}
              onUpgradePurchase={handleUpgradePurchase}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="skins" className="space-y-4">
          <div className="glass-panel p-4 rounded-lg">
            <SkinShop 
              coins={coins}
              onPurchase={handleSkinPurchase}
              onSelect={handleSkinSelect}
              selectedSkinId={selectedSkin}
              ownedSkins={ownedSkins}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="cases" className="space-y-4">
          <div className="glass-panel p-4 rounded-lg">
            <CaseShop 
              coins={coins}
              ownedSkins={ownedSkins}
              coinsPerClick={coinsPerClick}
              onCaseOpen={handleCaseOpen}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="promo" className="space-y-4">
          <div className="glass-panel p-4 rounded-lg">
            <Button 
              onClick={() => setShowPromoInput(true)}
              className="w-full bg-primary/90 hover:bg-primary"
            >
              Ввести промокод
            </Button>
            {showPromoInput && (
              <PromoCodeInput 
                onSubmit={handlePromoCodeSubmit}
                onOpenChange={setShowPromoInput}
              />
            )}
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Twitch Subscription Alert */}
      <AlertDialog open={showTwitchAlert} onOpenChange={setShowTwitchAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>МЫ ВЕРНУЛИСЬ!</AlertDialogTitle>
            <AlertDialogDescription className="text-center">
              Подпишись на Твич
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={() => {
                window.open("https://www.twitch.tv/VIKTORIA_VYS", "_blank");
                setShowTwitchAlert(false);
              }}
            >
              Подписаться
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default CatClicker;
