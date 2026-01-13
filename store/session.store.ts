"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type UserRole = "guest" | "member" | "student";

type SessionState = {
  role: UserRole;
  userName?: string;
  hydrated: boolean;

  login: (payload: { role: UserRole; userName?: string }) => void;
  logout: () => void;
  setHydrated: (v: boolean) => void;
};

export const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
      role: "guest",
      userName: undefined,
      hydrated: false,

      login: ({ role, userName }) => set((p) => ({ ...p, role, userName })),
      logout: () => set((p) => ({ ...p, role: "guest", userName: undefined })),
      setHydrated: (v) => set((p) => ({ ...p, hydrated: v })),
    }),
    {
      name: "smartlearning-session",
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    }
  )
);
