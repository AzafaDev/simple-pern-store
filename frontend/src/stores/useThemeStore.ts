import { create } from 'zustand';

interface State {
  dataTheme: string;
  setDataTheme: (theme: string) => void;
}

export const useStore = create<State>((set) => ({
  dataTheme: localStorage.getItem('theme') || 'dark',
  setDataTheme: (theme: string) => {
    localStorage.setItem('theme', theme);
    set({ dataTheme: theme });
  },
}));
