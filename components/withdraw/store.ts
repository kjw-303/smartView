"use client";

import { create } from "zustand";

export type WithdrawReasonKey = "not_use" | "hard" | "privacy" | "benefit_small" | "other";

type State = {
  reason: WithdrawReasonKey | null;
  detail: string;
  agreed: boolean;
  setReason: (r: WithdrawReasonKey) => void;
  setDetail: (v: string) => void;
  setAgreed: (v: boolean) => void;
  reset: () => void;
};

export const useWithdrawStore = create<State>((set) => ({
  reason: null,
  detail: "",
  agreed: false,

  setReason: (r) => set({ reason: r }),
  setDetail: (v) => set({ detail: v }),
  setAgreed: (v) => set({ agreed: v }),
  reset: () => set({ reason: null, detail: "", agreed: false }),
}));
