
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from "@/hooks/use-toast";
import { Ticket } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface PromoCodeInputProps {
  onSubmit: (code: string) => void;
  onOpenChange?: (open: boolean) => void;
}

const PromoCodeInput: React.FC<PromoCodeInputProps> = ({ 
  onSubmit,
  onOpenChange
}) => {
  const [promoCode, setPromoCode] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedCode = promoCode.trim();
    
    if (!trimmedCode) {
      toast({
        title: "Ошибка промокода",
        description: "Промокод не может быть пустым",
        variant: "destructive"
      });
      return;
    }
    
    // Regular promo code
    onSubmit(trimmedCode);
    setPromoCode('');
    if (onOpenChange) {
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={true} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md gradient-card">
        <DialogHeader>
          <DialogTitle className="text-xl text-center">Ввод промокода</DialogTitle>
        </DialogHeader>
        <div className="w-full">
          <p className="text-muted-foreground text-sm mb-4 text-center">
            Введите промокод, чтобы получить бонусные монеты или секретные скины
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col items-center gap-3">
            <Input
              type="text"
              placeholder="Введите промокод..."
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              className="text-sm w-full bg-white/50"
              autoFocus
            />
            <Button type="submit" size="sm" className="w-full bg-primary/90 hover:bg-primary">
              <Ticket size={16} className="mr-1" />
              Применить
            </Button>
          </form>
        </div>
        <DialogFooter className="mt-2">
          <Button variant="outline" onClick={() => onOpenChange && onOpenChange(false)} className="w-full bg-white/30">
            Отмена
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PromoCodeInput;
