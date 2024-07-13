import create from "zustand";

export const useStore: any = create((set: any) => ({
  bears: 0,
  user: {},
  increasePopulation: () => set((state: { bears: number; }) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),

  updateUser: (info: any) => set({ user: info }),
}));
