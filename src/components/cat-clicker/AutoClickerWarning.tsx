
import React from "react";
import { Shield } from "lucide-react";

interface AutoClickerWarningProps {
  active: boolean;
  cooldownSeconds: number;
}

const AutoClickerWarning: React.FC<AutoClickerWarningProps> = ({ 
  active, 
  cooldownSeconds 
}) => {
  if (!active) return null;
  
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/70 z-20 rounded-lg backdrop-blur-sm">
      <div className="bg-red-500/90 p-4 rounded-lg text-white max-w-xs text-center shadow-lg animate-pulse">
        <Shield className="mx-auto mb-2 h-12 w-12" />
        <h3 className="text-xl font-bold mb-2">Обнаружен автокликер!</h3>
        <p className="mb-3">Подозрительная активность кликов (более 50 кликов за 2 секунды). Пожалуйста, играйте честно!</p>
        <div className="bg-white/20 p-2 rounded-md">
          <span className="font-mono">Блокировка: {cooldownSeconds} сек</span>
        </div>
      </div>
    </div>
  );
};

export default AutoClickerWarning;
