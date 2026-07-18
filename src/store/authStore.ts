import { create } from "zustand";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  accessToken: string | null;
  user: User | null;
  hydrated: boolean;
  setAccessToken: (token: string) => void;
  setUser: (user: User) => void;
  setHydrated: (v: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  user: null,
  hydrated: false,
  setAccessToken: (token) => set({ accessToken: token }),
  setUser: (user) => set({ user }),
  setHydrated: (v) => set({ hydrated: v }),
  logout: () => set({ accessToken: null, user: null }),
}));