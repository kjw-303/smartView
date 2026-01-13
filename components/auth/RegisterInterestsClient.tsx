"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import AuthShell from "./AuthShell";
import RegisterProgress from "./RegisterProgress";
import Button from "@/components/ui/Button";
import InterestChip from "./InterestChip";
import { useRegisterStore } from "@/store/register.store";

const INTERESTS = [
  "웹디자인",
  "UI/UX",
  "프론트엔드",
  "백엔드",
  "데이터",
  "영상편집",
  "일러스트",
  "3D",
  "자격증",
  "취업/포트폴리오",
  "세미나/특강",
];

export default function RegisterInterestsClient() {
  const router = useRouter();
  const { draft, toggleInterest } = useRegisterStore();

  const selected = draft.interests ?? [];

  const canNext = useMemo(() => selected.length >= 1, [selected.length]);

  const onNext = () => {
    if (!canNext) return;
    router.push("/register/complete");
  };

  return (
    <AuthShell title="회원가입">
      <RegisterProgress step={4} total={5} />

      <div className="space-y-4">
        <div>
          <div className="text-sm font-semibold">관심분야를 선택해주세요</div>
          <div className="mt-1 text-xs text-neutral-500">
            최소 1개 이상 선택해주세요. (중복 선택 가능)
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {INTERESTS.map((label) => (
            <InterestChip
              key={label}
              label={label}
              selected={selected.includes(label)}
              onClick={() => toggleInterest(label)}
            />
          ))}
        </div>

        <div className="rounded-lg bg-neutral-50 p-3 text-xs text-neutral-600">
          선택됨: <span className="font-semibold">{selected.length}</span>개
          {selected.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {selected.map((v) => (
                <span key={v} className="rounded-full bg-white px-2 py-1 text-[11px]">
                  {v}
                </span>
              ))}
            </div>
          )}
        </div>

        <Button disabled={!canNext} onClick={onNext}>
          다음
        </Button>
      </div>
    </AuthShell>
  );
}
