import { create } from 'zustand';

interface UIStore {
    isSidebarOpen: boolean;
    toggleSidebar: () => void;
    closeSidebar: () => void;
    openSidebar: () => void;
}

const useUIStore = create<UIStore>((set) => ({
    isSidebarOpen: false, // Default closed on mobile
    toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
    closeSidebar: () => set({ isSidebarOpen: false }),
    openSidebar: () => set({ isSidebarOpen: true }),
}));

export default useUIStore;
