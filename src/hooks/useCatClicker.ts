
import { useState, useEffect, useCallback, useRef } from "react";
import { useConfettiStore } from "@/stores/use-confetti-store";
import { useGameStore } from "@/stores/use-game-store";
import { useToast } from "@/hooks/use-toast";

export const useCatClicker = () => {
  const [isClicking, setIsClicking] = useState(false);
  const [showGoldEffect, setShowGoldEffect] = useState(false);
  const [clickCooldown, setClickCooldown] = useState(false);
  const [autoClickerDetected, setAutoClickerDetected] = useState(false);
  const [cooldownSeconds, setCooldownSeconds] = useState(0);
  
  const clickTimestamps = useRef<number[]>([]);
  const cooldownTimer = useRef<NodeJS.Timeout | null>(null);
  const { toast } = useToast();
  
  const { confetti, setConfetti } = useConfettiStore();
  const { coins, coinsPerClick, passiveIncome, selectedSkin, addCoins } = useGameStore();

  // Reset auto-clicker detection after cooldown period
  useEffect(() => {
    if (autoClickerDetected && cooldownSeconds > 0) {
      const timer = setInterval(() => {
        setCooldownSeconds(prev => {
          if (prev <= 1) {
            setAutoClickerDetected(false);
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, [autoClickerDetected, cooldownSeconds]);

  // Passive income effect
  useEffect(() => {
    let passiveIncomeInterval: NodeJS.Timeout;

    if (passiveIncome > 0) {
      passiveIncomeInterval = setInterval(() => {
        addCoins(passiveIncome);
      }, 1000);
    }

    return () => {
      clearInterval(passiveIncomeInterval);
    };
  }, [passiveIncome, addCoins]);

  // Auto-clicker detection logic
  const detectAutoClicker = useCallback(() => {
    const now = Date.now();
    clickTimestamps.current.push(now);
    
    // Only keep clicks from the last 2 seconds
    clickTimestamps.current = clickTimestamps.current.filter(timestamp => 
      now - timestamp < 2000
    );
    
    // Check if more than 50 clicks in 2 seconds
    if (clickTimestamps.current.length > 50) {
      setAutoClickerDetected(true);
      setCooldownSeconds(30); // 30 second cooldown
      clickTimestamps.current = []; // Reset timestamps
      
      toast({
        title: "Обнаружен автокликер!",
        description: "Замечена подозрительная активность. Клики отключены на 30 секунд.",
        variant: "destructive"
      });
      
      return true;
    }
    
    return false;
  }, [toast]);

  // Click handler with auto-clicker protection and cooldown
  const handleCatClick = useCallback(() => {
    // Don't process clicks during cooldown or if autoclicker detected
    if (clickCooldown || autoClickerDetected) return;
    
    // Check for auto-clicker
    if (detectAutoClicker()) return;
    
    setIsClicking(true);
    setShowGoldEffect(true);
    setClickCooldown(true);

    // Add a very small cooldown between clicks (50ms) to prevent ultra-fast manual clicking
    setTimeout(() => {
      setClickCooldown(false);
    }, 50);
    
    setTimeout(() => {
      setIsClicking(false);
      setShowGoldEffect(false);
    }, 100);

    // Add coins
    addCoins(coinsPerClick);

    if (confetti) {
      setConfetti(false);
    } else {
      setConfetti(true);
    }
  }, [coinsPerClick, confetti, setConfetti, addCoins, clickCooldown, autoClickerDetected, detectAutoClicker]);

  return {
    isClicking,
    showGoldEffect,
    bonusActive: false, // Always return false for bonusActive
    bonusTimer: 0,
    bonusMultiplier: 1,
    bonusThreshold: 0,
    coins,
    coinsPerClick,
    passiveIncome,
    selectedSkin,
    handleCatClick,
    addCoins,
    autoClickerDetected,
    cooldownSeconds
  };
};
