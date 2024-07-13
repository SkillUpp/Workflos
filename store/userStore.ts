import create from "zustand";

export const useStore: any = create((set: any) => ({
  bears: 0,
  compareStr: "",
  user: {},
  increasePopulation: () => set((state: { bears: number; }) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
  updateCompareStr: (str: string) => set({ compareStr: str }),
  updateUser: (info: any) => set({ user: info }),
}));
