import { create } from "zustand";

// types.ts
export interface ConnectWalletNotificationState {
    isOpen: boolean;
    size: "sm" | "xs" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "full" | undefined;
    openModal: () => void;
    closeModal: () => void;
}

const useConnectWalletNotificationStore = create<ConnectWalletNotificationState>((set) => ({
    isOpen: false,
    size: 'sm',
    openModal: () => set({ isOpen: true }),
    closeModal: () => set({ isOpen: false }),
}));

export default useConnectWalletNotificationStore;