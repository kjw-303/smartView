"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type QuickMenuItem = {
  id: string;
  label: string;
  href: string;
};

export const DEFAULT_MENUS: QuickMenuItem[] = [
  { id: "courses", label: "수강중 강의", href: "/courses" },
  { id: "seminars", label: "세미나&특강", href: "/seminars" },
  { id: "attendance", label: "출석부", href: "/attendance/ledger" },
  { id: "bookstore", label: "교재몰", href: "#" },
  { id: "media", label: "미디어", href: "#" },
  { id: "support", label: "고객센터", href: "#" },
  { id: "notices", label: "공지사항", href: "/notices" },
  { id: "mypage", label: "마이페이지", href: "/my" },
];

type QuickMenuState = {
  // 선택된 메뉴 ID 목록 (순서 포함)
  selectedMenuIds: string[];
  // 모든 사용 가능한 메뉴
  allMenus: QuickMenuItem[];
  // Hydration 완료 여부
  hydrated: boolean;
  
  // 선택된 메뉴 목록 반환
  getSelectedMenus: () => QuickMenuItem[];
  // 메뉴 선택/해제
  toggleMenu: (menuId: string) => void;
  // 메뉴 순서 변경
  reorderMenus: (fromIndex: number, toIndex: number) => void;
  // 초기화
  reset: () => void;
  // Hydration 설정
  setHydrated: (v: boolean) => void;
};

export const useQuickMenuStore = create<QuickMenuState>()(
  persist(
    (set, get) => ({
      selectedMenuIds: DEFAULT_MENUS.map((m) => m.id),
      allMenus: DEFAULT_MENUS,
      hydrated: false,

      getSelectedMenus: () => {
        const { selectedMenuIds, allMenus } = get();
        return selectedMenuIds
          .map((id) => allMenus.find((m) => m.id === id))
          .filter((m): m is QuickMenuItem => m !== undefined);
      },

      toggleMenu: (menuId) =>
        set((state) => {
          const exists = state.selectedMenuIds.includes(menuId);
          if (exists) {
            // 최소 1개는 유지
            if (state.selectedMenuIds.length <= 1) return state;
            return {
              selectedMenuIds: state.selectedMenuIds.filter((id) => id !== menuId),
            };
          } else {
            // 최대 10개까지
            if (state.selectedMenuIds.length >= 10) return state;
            return {
              selectedMenuIds: [...state.selectedMenuIds, menuId],
            };
          }
        }),

      reorderMenus: (fromIndex, toIndex) =>
        set((state) => {
          const newIds = [...state.selectedMenuIds];
          const [removed] = newIds.splice(fromIndex, 1);
          newIds.splice(toIndex, 0, removed);
          return { selectedMenuIds: newIds };
        }),

      reset: () =>
        set({
          selectedMenuIds: DEFAULT_MENUS.map((m) => m.id),
        }),

      setHydrated: (v) => set({ hydrated: v }),
    }),
    {
      name: "smartview-quickmenu",
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    }
  )
);
