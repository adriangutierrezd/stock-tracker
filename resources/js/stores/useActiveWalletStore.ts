import { Wallet } from '@/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useActiveWalletStore = create((set) => ({
  activeWallet: null,
  setActiveWallet: (wallet: Wallet) => set({ activeWallet: wallet })
}));

export default useActiveWalletStore;
