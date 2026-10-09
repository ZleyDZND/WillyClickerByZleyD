
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from "@/hooks/use-toast";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction } from '@/components/ui/alert-dialog';
import { Key } from 'lucide-react';

interface SecretCodeInputProps {
  onCodeSubmit: (code: string) => void;
  showSecretSkinDialog: boolean;
  setShowSecretSkinDialog: (show: boolean) => void;
}

const SecretCodeInput: React.FC<SecretCodeInputProps> = ({ 
  onCodeSubmit, 
  showSecretSkinDialog, 
  setShowSecretSkinDialog 
}) => {
  const [code, setCode] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.trim()) {
      onCodeSubmit(code.trim());
      setCode('');
    }
  };

  const handleDialogClose = () => {
    setShowSecretSkinDialog(false);
    // Force reload the page to ensure all components re-render with the updated state
    window.location.reload();
  };

  return (
    <>
      <div className="w-full">
        <h3 className="text-center text-lg font-medium mb-2">Секретные коды</h3>
        <p className="text-muted-foreground text-sm text-center mb-3">
          Введите секретный код, чтобы открыть скрытый контент
        </p>
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <Input
            type="text"
            placeholder="Введите секретный код..."
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="text-sm"
            maxLength={5}
          />
          <Button type="submit" size="sm" className="whitespace-nowrap">
            <Key size={16} className="mr-1" />
            Проверить
          </Button>
        </form>
      </div>

      <AlertDialog open={showSecretSkinDialog} onOpenChange={setShowSecretSkinDialog}>
        <AlertDialogContent className="bg-gradient-to-br from-purple-500 to-pink-600 border-none text-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl">Поздравляем!</AlertDialogTitle>
            <AlertDialogDescription className="text-white text-base">
              <div className="flex flex-col items-center justify-center space-y-4 py-4">
                <img 
                  src="/lovable-uploads/843a7795-7de4-4b7e-808b-30e7240830df.png" 
                  alt="Кинито Вилли"
                  className="w-40 h-40 mx-auto object-contain rounded-xl border-2 border-white/20 shadow-lg"
                />
                <p className="text-lg font-semibold">Кинито Вилли</p>
                <p>Поздравляем, вы нашли секретный скин "Кинито Вилли"! В будущем будет больше тайн.</p>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction 
              className="bg-white text-pink-600 hover:bg-white/90 hover:text-pink-700"
              onClick={handleDialogClose}
            >
              Забрать скин
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default SecretCodeInput;
