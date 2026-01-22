"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ProfileImageType = "character" | "upload";

export type ProfileImage = 
  | { type: "character"; characterId: string }
  | { type: "upload"; imageUrl: string };

type ProfileState = {
  profileImage: ProfileImage | null;
  setProfileImage: (image: ProfileImage) => void;
  getProfileImageUrl: () => string | null; // 표시용 URL 반환
};

// 기본 제공 캐릭터 목록 (실제로는 이미지 URL이 될 것)
const DEFAULT_CHARACTERS = Array.from({ length: 20 }, (_, i) => ({
  id: `char-${i + 1}`,
  // 실제로는 캐릭터 이미지 URL이 들어갈 것
  url: `/images/characters/char-${i + 1}.png`, // 플레이스홀더
}));

export { DEFAULT_CHARACTERS };

export const useProfileStore = create<ProfileState>()(
  persist(
    (set, get) => ({
      profileImage: null,

      setProfileImage: (image) => set({ profileImage: image }),

      getProfileImageUrl: () => {
        const { profileImage } = get();
        if (!profileImage) return null;
        
        if (profileImage.type === "character") {
          // 캐릭터 ID로 이미지 URL 생성
          return `/images/characters/${profileImage.characterId}.png`;
        }
        
        // 업로드된 이미지 URL
        return profileImage.imageUrl;
      },
    }),
    {
      name: "smartview-profile",
    }
  )
);
