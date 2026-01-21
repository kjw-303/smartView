"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

const INTERESTS = [
  "컴퓨터", "AI", "제과제빵", "바리스타",
  "디지털드로잉", "포토샵", "일러스트",
  "웹툰", "웹소설", "게임 캐릭터",
  "메이크업", "네일아트", "피부미용", "왁싱",
  "노래", "연기", "댄스", "악기연주",
  "승무원", "스피치", "라이브커머스",
  "프로그래밍", "코딩", "C언어",
  "AI 이미지 생성", "애견미용",
  "펫푸드", "방학특강", "원데이클래스",
  "시니어", "대학입시", "취업/진로", "창업",
];

const MIN_COUNT = 3;

export default function InterestsPageClient() {
  const router = useRouter();

  // TODO: 실제로는 사용자 저장된 관심사로 초기화
  const [selected, setSelected] = React.useState<string[]>(["포토샵", "악기연주", "취업/진로"]);

  const toggle = (name: string) => {
    setSelected((prev) =>
      prev.includes(name) ? prev.filter((x) => x !== name) : [...prev, name]
    );
  };

  const canSubmit = selected.length >= MIN_COUNT;

  const onSubmit = async () => {
    if (!canSubmit) return;

    // TODO: API 연결
    // await fetch("/api/my/interests", { method:"POST", body: JSON.stringify({ interests: selected }) })

    router.back();
  };

  return (
    <div className="min-h-dvh bg-white">
      {/* 상단바 */}
      <div className="sticky top-0 z-10 bg-white">
        <div className="flex items-center px-4 py-3">
          <div className="mx-auto pr-8 text-base font-semibold text-neutral-900"></div>
        </div>
        <div className="h-px bg-neutral-200" />
      </div>

      {/* 안내문 */}
      <div className="px-4 pt-5">
        <div className="text-sm font-semibold text-neutral-900">
          맞춤 콘텐츠 추천을 위해
        </div>
        <div className="mt-1 text-sm text-neutral-500">
          관심사를 선택해주세요! (최소 {MIN_COUNT}개)
        </div>
      </div>

      {/* 태그 리스트 */}
      <div className="px-4 pb-14 pt-5">
        <div className="flex flex-wrap gap-2">
          {INTERESTS.map((it) => {
            const active = selected.includes(it);
            return (
              <button
                key={it}
                type="button"
                onClick={() => toggle(it)}
                className={[
                  "h-9 rounded-full border px-4 text-sm",
                  active
                    ? "border-[#1E2348] bg-white text-[#1E2348] font-semibold"
                    : "border-neutral-200 bg-white text-neutral-700",
                ].join(" ")}
              >
                {it}
              </button>
            );
          })}
        </div>

        {/* 최소 선택 안내 */}
        {!canSubmit ? (
          <div className="mt-4 text-xs text-neutral-400">
            {MIN_COUNT - selected.length}개 더 선택해주세요.
          </div>
        ) : (
          <div className="mt-4 text-xs text-neutral-400">
            {selected.length}개 선택됨
          </div>
        )}
      </div>

      {/* 하단 완료 버튼 */}
      <div className="bottom-0 left-0 right-0 bg-white p-4">
        <button
          type="button"
          onClick={onSubmit}
          disabled={!canSubmit}
          className={[
            "h-12 w-full rounded-xl text-sm font-semibold",
            canSubmit
              ? "bg-[#1E2348] text-white active:opacity-90"
              : "bg-neutral-200 text-neutral-500",
          ].join(" ")}
        >
          완료
        </button>
      </div>
    </div>
  );
}
