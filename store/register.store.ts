"use client";

import { create } from "zustand";
import type { AgreementKey, RegisterDraft } from "@/types/register";

const defaultDraft: RegisterDraft = {
  agreements: {
    age: false,      // (필수) 만 14세 이상
    service: false,  // (필수) 서비스 이용약관
    privacy: false,  // (필수) 개인정보 처리방침
    marketing: false // (선택) 마케팅
  },
};

type State = {
  draft: RegisterDraft;
  toggleAgreement: (key: AgreementKey) => void;
  setAgreement: (key: AgreementKey, value: boolean) => void;
  setAllAgreements: (value: boolean) => void;
  resetRegister: () => void;
  setForm: (form: { email?: string; password?: string; phone?: string }) => void;
  toggleInterest: (value: string) => void;
  setInterests: (values: string[]) => void;
  setProfile: (profile: { name?: string; birth?: string; gender?: "male" | "female" | "none"; avatarUrl?: string | null }) => void;
};

export const useRegisterStore = create<State>((set) => ({
  draft: defaultDraft,

  toggleAgreement: (key) =>
    set((s) => ({
      draft: {
        ...s.draft,
        agreements: { ...s.draft.agreements, [key]: !s.draft.agreements[key] },
      },
    })),

  setAgreement: (key, value) =>
    set((s) => ({
      draft: {
        ...s.draft,
        agreements: { ...s.draft.agreements, [key]: value },
      },
    })),

  setAllAgreements: (value) =>
    set((s) => ({
      draft: {
        ...s.draft,
        agreements: Object.fromEntries(
          Object.keys(s.draft.agreements).map((k) => [k, value])
        ) as RegisterDraft["agreements"],
      },
    })),

  setForm: (form) =>
  set((s) => ({
    draft: {
      ...s.draft,
      form: { ...s.draft.form, ...form },
    },
  })),
  toggleInterest: (value) =>
  set((s) => {
    const prev = s.draft.interests ?? [];
    const exists = prev.includes(value);
    const next = exists ? prev.filter((v) => v !== value) : [...prev, value];
    return { draft: { ...s.draft, interests: next } };
  }),

  setInterests: (values) =>
  set((s) => ({ draft: { ...s.draft, interests: values } })),
  
  setProfile: (profile) =>
  set((s) => ({
    draft: {
      ...s.draft,
      profile: { ...s.draft.profile, ...profile },
    },
  })),


  resetRegister: () => set({ draft: defaultDraft }),
}));
