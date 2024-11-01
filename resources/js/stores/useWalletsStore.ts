import { Wallet } from '@/types';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface WalletsState {
  wallets: Wallet[];
  setWallets: (wallets: Wallet[]) => void;
}

const useWalletsStorage = create<WalletsState>()(
  persist(
    (set) => ({
      wallets: [],
      setWallets: (wallets: Wallet[]) => set({ wallets }),
    }),
    {
      name: 'wallets-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useWalletsStorage;
