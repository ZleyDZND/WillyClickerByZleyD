
import { useState, useRef, useEffect } from "react";
import CatClicker from "@/components/CatClicker";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Eye } from "lucide-react";

const Index = () => {
  const [secretCode, setSecretCode] = useState("");
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [showSecretSkinAlert, setShowSecretSkinAlert] = useState(false);
  const [showWelcomeAlert, setShowWelcomeAlert] = useState(false);
  const [gameState, setGameState] = useState({
    coins: 0,
    coinsPerClick: 1,
    passiveIncome: 0,
    ownedSkins: [1],
    selectedSkin: 1
  });
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const morseCode = ".---- ..--- ----. ..... --...";
  const { toast } = useToast();

  useEffect(() => {
    const savedData = localStorage.getItem('catClickerSave');
    if (savedData) {
      try {
        const data = JSON.parse(savedData);
        setGameState({
          coins: data.coins || 0,
          coinsPerClick: data.coinsPerClick || 1,
          passiveIncome: data.passiveIncome || 0,
          ownedSkins: data.ownedSkins || [1],
          selectedSkin: data.selectedSkin || 1
        });
      } catch (error) {
        console.error('Error loading game data', error);
      }
    }

    // Check if welcome alert has been shown
    const welcomeShown = localStorage.getItem('welcomeAlertShown');
    if (!welcomeShown) {
      setShowWelcomeAlert(true);
    }
  }, []);

  const playSecretAudio = () => {
    if (audioRef.current) {
      if (isAudioPlaying) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        setIsAudioPlaying(false);
      } else {
        audioRef.current.play().catch(error => {
          console.error("Error playing audio:", error);
          toast({
            title: "Ошибка воспроизведения",
            description: "Не удалось воспроизвести аудио",
            variant: "destructive"
          });
        });
        setIsAudioPlaying(true);
      }
    }
  };

  const handleCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (secretCode === "12957") {
      toast({
        title: "Секретный код верный!",
        description: "Теперь вы можете воспроизвести секретное аудио",
        variant: "default"
      });
      playSecretAudio();
    } else if (secretCode === "78345") {
      window.open("https://youtu.be/b55XcIQxY10?si=6a0EFycDlBp9XcMv", "_blank");
      toast({
        title: "Секретный код активирован!",
        description: "Открываем YouTube видео...",
        variant: "default"
      });
    } else if (secretCode === "06645") {
      const ownedSkinsStr = localStorage.getItem('catClickerSave');
      if (ownedSkinsStr) {
        const data = JSON.parse(ownedSkinsStr);
        if (!data.ownedSkins.includes(8)) {
          data.ownedSkins.push(8);
          localStorage.setItem('catClickerSave', JSON.stringify(data));
          setShowSecretSkinAlert(true);
          // Update the local state as well
          setGameState(prevState => ({
            ...prevState,
            ownedSkins: [...prevState.ownedSkins, 8]
          }));
        } else {
          toast({
            title: "Секретный скин уже получен",
            description: "Вы уже получили скин 'Кинито Вилли'",
            variant: "default"
          });
        }
      } else {
        const initialData = {
          coins: 0,
          coinsPerClick: 1,
          passiveIncome: 0,
          upgrades: [],
          cards: [],
          ownedSkins: [1, 8],
          selectedSkin: 1,
          limitedSkinRemaining: 7,
          usedPromoCodes: []
        };
        localStorage.setItem('catClickerSave', JSON.stringify(initialData));
        setGameState(prevState => ({
          ...prevState,
          ownedSkins: [1, 8]
        }));
        setShowSecretSkinAlert(true);
      }
    } else if (secretCode === "04488") {
      const ownedSkinsStr = localStorage.getItem('catClickerSave');
      if (ownedSkinsStr) {
        const data = JSON.parse(ownedSkinsStr);
        if (!data.ownedSkins.includes(39)) {
          data.ownedSkins.push(39);
          localStorage.setItem('catClickerSave', JSON.stringify(data));
          setShowSecretSkinAlert(true);
          setGameState(prevState => ({
            ...prevState,
            ownedSkins: [...prevState.ownedSkins, 39]
          }));
        } else {
          toast({
            title: "Секретный скин уже получен",
            description: "Вы уже получили скин 'Вилли Улыбается тебе'",
            variant: "default"
          });
        }
      } else {
        const initialData = {
          coins: 0,
          coinsPerClick: 1,
          passiveIncome: 0,
          upgrades: [],
          cards: [],
          ownedSkins: [1, 39],
          selectedSkin: 1,
          limitedSkinRemaining: 7,
          usedPromoCodes: []
        };
        localStorage.setItem('catClickerSave', JSON.stringify(initialData));
        setGameState(prevState => ({
          ...prevState,
          ownedSkins: [1, 39]
        }));
        setShowSecretSkinAlert(true);
      }
    }
  };

  const handleSkinPurchase = (id: number, cost: number) => {
    const newState = {
      ...gameState,
      coins: gameState.coins - cost,
      ownedSkins: [...gameState.ownedSkins, id]
    };
    
    setGameState(newState);
    
    const savedData = localStorage.getItem('catClickerSave');
    if (savedData) {
      try {
        const data = JSON.parse(savedData);
        const updatedData = {
          ...data,
          coins: newState.coins,
          ownedSkins: newState.ownedSkins
        };
        localStorage.setItem('catClickerSave', JSON.stringify(updatedData));
      } catch (error) {
        console.error('Error updating skin purchase data', error);
      }
    }
  };

  const handleSkinSelect = (id: number) => {
    const newState = {
      ...gameState,
      selectedSkin: id
    };
    
    setGameState(newState);
    
    const savedData = localStorage.getItem('catClickerSave');
    if (savedData) {
      try {
        const data = JSON.parse(savedData);
        const updatedData = {
          ...data,
          selectedSkin: id
        };
        localStorage.setItem('catClickerSave', JSON.stringify(updatedData));
      } catch (error) {
        console.error('Error updating selected skin data', error);
      }
    }
  };

  const handleUpgradePurchase = (id: string, cost: number) => {
    let newCoinsPerClick = gameState.coinsPerClick;
    let newPassiveIncome = gameState.passiveIncome;
    
    if (id.includes('click_power')) {
      newCoinsPerClick += 1;
    } else if (id.includes('passive_income')) {
      newPassiveIncome += 1;
    }
    
    const newState = {
      ...gameState,
      coins: gameState.coins - cost,
      coinsPerClick: newCoinsPerClick,
      passiveIncome: newPassiveIncome
    };
    
    setGameState(newState);
    
    const savedData = localStorage.getItem('catClickerSave');
    if (savedData) {
      try {
        const data = JSON.parse(savedData);
        const updatedData = {
          ...data,
          coins: newState.coins,
          coinsPerClick: newCoinsPerClick,
          passiveIncome: newPassiveIncome
        };
        localStorage.setItem('catClickerSave', JSON.stringify(updatedData));
      } catch (error) {
        console.error('Error updating upgrade purchase data', error);
      }
    }
  };

  const handleClaimSecretSkin = () => {
    setShowSecretSkinAlert(false);
    const data = JSON.parse(localStorage.getItem('catClickerSave') || '{}');
    const skinName = data.ownedSkins.includes(8) && !data.ownedSkins.includes(39) ? "Кинито Вилли" : 
                    data.ownedSkins.includes(39) && !data.ownedSkins.includes(8) ? "Вилли Улыбается тебе" : 
                    "секретный скин";
    toast({
      title: "Скин получен!",
      description: `Вы успешно получили скин '${skinName}'`,
      variant: "default"
    });
    // Force a page reload to ensure all components re-render with the updated state
    window.location.reload();
  };

  const handleClaimWelcomeSkin = () => {
    const savedData = localStorage.getItem('catClickerSave');
    let data;
    
    if (savedData) {
      data = JSON.parse(savedData);
      if (!data.ownedSkins.includes(42)) {
        data.ownedSkins.push(42);
        localStorage.setItem('catClickerSave', JSON.stringify(data));
        setGameState(prevState => ({
          ...prevState,
          ownedSkins: [...prevState.ownedSkins, 42]
        }));
      }
    } else {
      data = {
        coins: 0,
        coinsPerClick: 1,
        passiveIncome: 0,
        upgrades: [],
        cards: [],
        ownedSkins: [1, 42],
        selectedSkin: 1,
        limitedSkinRemaining: 7,
        usedPromoCodes: []
      };
      localStorage.setItem('catClickerSave', JSON.stringify(data));
      setGameState(prevState => ({
        ...prevState,
        ownedSkins: [1, 42]
      }));
    }

    localStorage.setItem('welcomeAlertShown', 'true');
    setShowWelcomeAlert(false);
    
    toast({
      title: "Персонаж получен!",
      description: "Вы успешно получили персонажа 'Злейд'",
      variant: "default"
    });
    
    window.location.reload();
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto py-6 relative">
        <audio ref={audioRef} src="/secret-audio.mp3" onEnded={() => setIsAudioPlaying(false)} />
        
        <div className="fixed top-4 left-4 z-50">
          <Popover>
            <PopoverTrigger asChild>
              <Button 
                variant="ghost" 
                className="opacity-10 hover:opacity-100 transition-opacity flex items-center gap-1" 
                aria-label="Morse Code"
                title={morseCode}
              >
                <Eye size={18} className="text-primary" />
                <span>👁️</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 gradient-card border-none text-white">
              <div className="space-y-4">
                <h3 className="font-mono text-sm">Секретный раздел</h3>
                <div className="bg-black/20 p-2 rounded-md font-mono text-center">
                  {morseCode}
                </div>
                <form onSubmit={handleCodeSubmit} className="space-y-2">
                  <Input
                    type="text"
                    placeholder="Введите код..."
                    value={secretCode}
                    onChange={(e) => setSecretCode(e.target.value)}
                    className="bg-white/20 border-white/20"
                  />
                  <Button type="submit" className="w-full">Проверить</Button>
                  {secretCode === "12957" && (
                    <Button 
                      type="button" 
                      onClick={playSecretAudio} 
                      className="w-full mt-2 bg-purple-600 hover:bg-purple-700"
                    >
                      {isAudioPlaying ? "Остановить аудио" : "Воспроизвести аудио"}
                    </Button>
                  )}
                </form>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        
        <div className="fixed top-4 right-4 z-50">
          <ThemeToggle />
        </div>
        
        <header className="text-center mb-4">
          <h1 className="text-4xl font-bold tracking-tight mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Вилли Кликер</h1>
          <p className="text-muted-foreground">Кликайте котика, получайте монеты, покупайте улучшения!</p>
        </header>
        
        <CatClicker />
        
        <footer className="text-center text-sm text-muted-foreground pb-8 mt-12">
          <p>Кликайте Вилли и собирайте все его скины!</p>
        </footer>

        <AlertDialog open={showSecretSkinAlert} onOpenChange={setShowSecretSkinAlert}>
          <AlertDialogContent className="bg-gradient-to-br from-purple-500 to-pink-600 border-none text-white">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-2xl font-bold">Поздравляем!</AlertDialogTitle>
              <AlertDialogDescription className="text-white">
                {(() => {
                  const data = JSON.parse(localStorage.getItem('catClickerSave') || '{}');
                  const hasKinito = data.ownedSkins?.includes(8);
                  const hasSmiling = data.ownedSkins?.includes(39);
                  
                  if (hasKinito && !hasSmiling) {
                    return (
                      <div className="flex flex-col items-center justify-center space-y-4 py-4">
                        <img 
                          src="/lovable-uploads/843a7795-7de4-4b7e-808b-30e7240830df.png" 
                          alt="Кинито Вилли" 
                          className="w-48 h-48 object-contain rounded-xl border-2 border-white/20 shadow-lg"
                        />
                        <p className="text-lg">
                          Поздравляем, вы нашли секретный скин "Кинито Вилли"! В будущем будет больше тайн.
                        </p>
                      </div>
                    );
                  } else if (hasSmiling && !hasKinito) {
                    return (
                      <div className="flex flex-col items-center justify-center space-y-4 py-4">
                        <img 
                          src="/lovable-uploads/d70cda16-a51e-44d8-bd91-e824b64f161c.png" 
                          alt="Вилли Улыбается тебе" 
                          className="w-48 h-48 object-contain rounded-xl border-2 border-white/20 shadow-lg"
                        />
                        <p className="text-lg">
                          Поздравляем, вы нашли секретный скин "Вилли Улыбается тебе"! В будущем будет больше тайн.
                        </p>
                      </div>
                    );
                  } else {
                    return (
                      <div className="flex flex-col items-center justify-center space-y-4 py-4">
                        <img 
                          src="/lovable-uploads/843a7795-7de4-4b7e-808b-30e7240830df.png" 
                          alt="Секретный скин" 
                          className="w-48 h-48 object-contain rounded-xl border-2 border-white/20 shadow-lg"
                        />
                        <p className="text-lg">
                          Поздравляем, вы нашли секретный скин! В будущем будет больше тайн.
                        </p>
                      </div>
                    );
                  }
                })()}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction 
                className="bg-white text-pink-600 hover:bg-white/90 hover:text-pink-700"
                onClick={handleClaimSecretSkin}
              >
                Забрать скин
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <AlertDialog open={showWelcomeAlert} onOpenChange={setShowWelcomeAlert}>
          <AlertDialogContent className="bg-gradient-to-br from-green-500 to-emerald-600 border-none text-white">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-2xl font-bold">МЫ ВЕРНУЛИСЬ!</AlertDialogTitle>
              <AlertDialogDescription className="text-white">
                <div className="flex flex-col items-center justify-center space-y-4 py-4">
                  <img 
                    src="/lovable-uploads/zleyd-willy.png" 
                    alt="Злейд" 
                    className="w-48 h-48 object-contain rounded-xl border-2 border-white/20 shadow-lg"
                  />
                  <p className="text-lg text-center">
                    Мы дарим вам нового персонажа "Злейд"!
                  </p>
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction 
                className="bg-white text-emerald-600 hover:bg-white/90 hover:text-emerald-700"
                onClick={handleClaimWelcomeSkin}
              >
                Получить
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default Index;
