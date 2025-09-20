import { create } from "zustand";

export interface User {
  id: string;
  username: string;
  email: string;
  role: "admin" | "user";
}

interface UserState {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (data: User | null) => set({ user: data }),
  clearUser: () => set({ user: null }),
}));
