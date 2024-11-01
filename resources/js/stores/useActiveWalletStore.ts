import { Wallet } from '@/types';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface ActiveWalletState {
  activeWallet: Wallet | null;
  setActiveWallet: (wallet: Wallet) => void;
}

const useActiveWalletStore = create(
  persist(
    (set) => ({
      activeWallet: null,
      setActiveWallet: (wallet: Wallet) => set({ activeWallet: wallet })
    }),
    {
      name: 'active-wallet-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)

export default useActiveWalletStore;