
import { create } from 'zustand';

interface ConfettiState {
  confetti: boolean;
  setConfetti: (value: boolean) => void;
}

export const useConfettiStore = create<ConfettiState>((set) => ({
  confetti: false,
  setConfetti: (value) => set({ confetti: value }),
}));
