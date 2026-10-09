
import { create } from 'zustand';

interface GameState {
  coins: number;
  coinsPerClick: number;
  passiveIncome: number;
  selectedSkin: number;
  ownedSkins: number[];
  addCoins: (amount: number) => void;
  setCoinsPerClick: (amount: number) => void;
  setPassiveIncome: (amount: number) => void;
  setSelectedSkin: (id: number) => void;
  addOwnedSkin: (id: number) => void;
}

// Helper function to save state to localStorage
const saveToLocalStorage = (state: Partial<GameState>) => {
  try {
    const savedState = localStorage.getItem('catClickerSave');
    let currentData = {
      coins: 0,
      coinsPerClick: 1,
      passiveIncome: 0,
      selectedSkin: 1,
      ownedSkins: [1, 43],
      purchasedUpgrades: [],
      purchasedCards: [],
      usedPromoCodes: []
    };

    if (savedState) {
      currentData = { ...currentData, ...JSON.parse(savedState) };
    }

    // Update with new state
    const updatedData = { ...currentData, ...state };
    localStorage.setItem('catClickerSave', JSON.stringify(updatedData));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

// Helper function to load state from localStorage
const loadFromLocalStorage = () => {
  try {
    const savedState = localStorage.getItem('catClickerSave');
    if (savedState) {
      const data = JSON.parse(savedState);
      const ownedSkins = data.ownedSkins || [1, 43];
      
      // Migration: ensure Vi character (id 43) is always included
      if (!ownedSkins.includes(43)) {
        ownedSkins.push(43);
        // Save the updated data back to localStorage
        const updatedData = { ...data, ownedSkins };
        localStorage.setItem('catClickerSave', JSON.stringify(updatedData));
      }
      
      return {
        coins: data.coins || 0,
        coinsPerClick: data.coinsPerClick || 1,
        passiveIncome: data.passiveIncome || 0,
        selectedSkin: data.selectedSkin || 1,
        ownedSkins
      };
    }
  } catch (error) {
    console.error('Error loading from localStorage:', error);
  }
  
  // Return default values if no saved data or error
  return {
    coins: 0,
    coinsPerClick: 1,
    passiveIncome: 0,
    selectedSkin: 1,
    ownedSkins: [1, 43]
  };
};

export const useGameStore = create<GameState>((set, get) => {
  // Load initial state from localStorage
  const initialState = loadFromLocalStorage();

  return {
    ...initialState,
    addCoins: (amount) => 
      set((state) => {
        const newCoins = state.coins + amount;
        saveToLocalStorage({ coins: newCoins });
        return { coins: newCoins };
      }),
    setCoinsPerClick: (amount) => 
      set((state) => {
        saveToLocalStorage({ coinsPerClick: amount });
        return { coinsPerClick: amount };
      }),
    setPassiveIncome: (amount) => 
      set((state) => {
        saveToLocalStorage({ passiveIncome: amount });
        return { passiveIncome: amount };
      }),
    setSelectedSkin: (id) => 
      set((state) => {
        saveToLocalStorage({ selectedSkin: id });
        return { selectedSkin: id };
      }),
    addOwnedSkin: (id) => 
      set((state) => {
        if (state.ownedSkins.includes(id)) return { ownedSkins: state.ownedSkins };
        
        const newOwnedSkins = [...state.ownedSkins, id];
        saveToLocalStorage({ ownedSkins: newOwnedSkins });
        return { ownedSkins: newOwnedSkins };
      }),
  };
});
