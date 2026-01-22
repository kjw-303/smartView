"use client";

import * as React from "react";
import Portal from "@/components/ui/Portal";
import { useProfileStore, DEFAULT_CHARACTERS, type ProfileImage } from "@/store/profile.store";

export default function ProfileEditSheet({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const profileImage = useProfileStore((s) => s.profileImage);
  const setProfileImage = useProfileStore((s) => s.setProfileImage);
  const fileRef = React.useRef<HTMLInputElement | null>(null);

  const [selectedCharacterId, setSelectedCharacterId] = React.useState<string | null>(
    profileImage?.type === "character" ? profileImage.characterId : null
  );
  const [uploadedImageUrl, setUploadedImageUrl] = React.useState<string | null>(
    profileImage?.type === "upload" ? profileImage.imageUrl : null
  );
  const [mode, setMode] = React.useState<"character" | "upload">(
    profileImage?.type === "upload" ? "upload" : "character"
  );

  React.useEffect(() => {
    if (open && profileImage) {
      if (profileImage.type === "character") {
        setSelectedCharacterId(profileImage.characterId);
        setMode("character");
      } else {
        setUploadedImageUrl(profileImage.imageUrl);
        setMode("upload");
      }
    }
  }, [open, profileImage]);

  const handlePickImage = () => {
    fileRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("이미지 파일만 업로드할 수 있어요.");
      return;
    }

    const url = URL.createObjectURL(file);
    setUploadedImageUrl(url);
    setMode("upload");
    setSelectedCharacterId(null);
  };

  const handleSelectCharacter = (characterId: string) => {
    setSelectedCharacterId(characterId);
    setMode("character");
    setUploadedImageUrl(null);
  };

  const handleSave = () => {
    let newProfileImage: ProfileImage | null = null;

    if (mode === "character" && selectedCharacterId) {
      newProfileImage = { type: "character", characterId: selectedCharacterId };
    } else if (mode === "upload" && uploadedImageUrl) {
      newProfileImage = { type: "upload", imageUrl: uploadedImageUrl };
    }

    if (newProfileImage) {
      setProfileImage(newProfileImage);
    }

    onClose();
  };

  if (!open) return null;

  return (
    <Portal>
      <div className="absolute inset-0 z-[70] pointer-events-auto">
        {/* dim */}
        <div className="absolute inset-0 bg-black/40" onClick={onClose} />

        {/* sheet */}
        <div className="absolute bottom-0 left-0 right-0 rounded-t-3xl bg-white max-h-[80vh] flex flex-col">
          <div className="mx-auto mt-3 mb-4 h-1 w-10 rounded-full bg-neutral-200" />

          {/* 헤더 */}
          <div className="px-5 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-neutral-900">프로필 이미지 선택</h2>
            <button
              type="button"
              onClick={onClose}
              className="h-8 w-8 flex items-center justify-center text-neutral-400"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M18 6L6 18M6 6l12 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          {/* 탭 선택 */}
          <div className="px-5 mt-4 flex gap-2">
            <button
              type="button"
              onClick={() => setMode("character")}
              className={[
                "flex-1 rounded-lg py-2 text-sm font-semibold",
                mode === "character"
                  ? "bg-[#1E2348] text-white"
                  : "bg-neutral-100 text-neutral-600",
              ].join(" ")}
            >
              캐릭터
            </button>
            <button
              type="button"
              onClick={() => setMode("upload")}
              className={[
                "flex-1 rounded-lg py-2 text-sm font-semibold",
                mode === "upload"
                  ? "bg-[#1E2348] text-white"
                  : "bg-neutral-100 text-neutral-600",
              ].join(" ")}
            >
              사진 업로드
            </button>
          </div>

          {/* 콘텐츠 영역 */}
          <div className="flex-1 overflow-y-auto px-5 py-4">
            {mode === "character" ? (
              <div className="grid grid-cols-5 gap-3">
                {DEFAULT_CHARACTERS.map((char) => {
                  const isSelected = selectedCharacterId === char.id;
                  return (
                    <button
                      key={char.id}
                      type="button"
                      onClick={() => handleSelectCharacter(char.id)}
                      className="relative aspect-square rounded-full overflow-hidden border-2 bg-neutral-100"
                    >
                      {/* 플레이스홀더 - 실제로는 이미지가 들어갈 것 */}
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-orange-200 to-orange-400">
                        <div className="w-3/4 h-3/4 rounded-full bg-white" />
                      </div>
                      
                      {isSelected && (
                        <div className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-red-500 flex items-center justify-center">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                            <path
                              d="M20 6L9 17l-5-5"
                              stroke="white"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="space-y-4">
                {/* 업로드된 이미지 미리보기 */}
                {uploadedImageUrl ? (
                  <div className="relative w-15 h-15 mx-auto rounded-full overflow-hidden border-2 border-neutral-200">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={uploadedImageUrl}
                      alt="업로드된 프로필"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-15 h-15 mx-auto rounded-full bg-neutral-100 flex items-center justify-center">
                    <div className="text-xs text-neutral-400">이미지 없음</div>
                  </div>
                )}

                {/* 업로드 버튼 */}
                <button
                  type="button"
                  onClick={handlePickImage}
                  className="w-full rounded-xl border-2 border-dashed border-neutral-300 bg-neutral-50 py-4 text-sm font-medium text-neutral-700"
                >
                  사진 선택하기
                </button>

                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>
            )}
          </div>

          {/* 저장 버튼 */}
          <div className="px-5 pb-5 pt-4 border-t border-neutral-100">
            <button
              type="button"
              onClick={handleSave}
              disabled={
                (mode === "character" && !selectedCharacterId) ||
                (mode === "upload" && !uploadedImageUrl)
              }
              className={[
                "w-full rounded-xl py-3 text-sm font-semibold text-white",
                (mode === "character" && selectedCharacterId) ||
                (mode === "upload" && uploadedImageUrl)
                  ? "bg-[#FF6B35]"
                  : "bg-neutral-300 cursor-not-allowed",
              ].join(" ")}
            >
              저장
            </button>
          </div>
        </div>
      </div>
    </Portal>
  );
}
